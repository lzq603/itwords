#-*-coding:utf-8 -*-
import json
import sys
import urllib.parse

import fool
import requests
import bs4
import sklearn
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer, TfidfTransformer
from sklearn.svm import SVC

import mysql


categories = [1,2,3,4]
def get_html(web_url):
    #创建header,伪装自己是一个人
    header = {
        #挂上用户代理
        "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36"
    }

    #之后通过request库对页面信息进行采集
    #因为是要加上header，所以使用传参的方式,返回一个字符串
    html = requests.get(url=web_url,headers=header)
    html.encoding = html.apparent_encoding
    htmlText = html.text

    #使用bs对采集到的样本进行解析
    soup = bs4.BeautifulSoup(htmlText,"lxml")
    return soup

def get_policy(keyword):
    hrefs = []
    data  = {
        'keyword':keyword,
        'curPage':1,
        'sortField':0,
        'searchFields':1,
        'lang':'cn'
    }
    web_url = "http://so.news.cn/getNews?"+urllib.parse.urlencode(data)
    response = requests.get(web_url)
    if response.status_code == 200:
        data = json.loads(response.text)
        code = data.get('code')
        content = data.get('content')
        if code is not 200:
            return  hrefs
        elif isinstance(content,str):
            return hrefs
        else:
            results = data.get('content').get('results')
            if results is None:
                return hrefs
            previous = []
            for result in results:
                # print(result)
                title = result.get('title').replace("<font color=red>", "").replace("</font>", "")

                url = result.get('url')
                if title in previous:
                    continue
                else:
                    previous.append(title)

                hrefs.append({
                    'title':title,
                    'url':url
                })
            return hrefs
    else:
        return hrefs


#如果正常途径下可以获取解释，使用此处
def get_parses(keyword):
    # sql = "SELECT keyword FROM T_Content ORDER BY weight DESC"
    # mysql.select(sql)
    #对一个单词进行查询
    web_url = "https://baike.baidu.com/item/"+keyword
    soup = get_html(web_url)


    finalExplanation = ""
    # 进行初步的过滤数据
    data = soup.find("meta", {"name": "description"})
    if data is not None:
        finalExplanation = data.get('content')
        return finalExplanation
    return ""

# 对新词进行分类
def classify(word,dict):

    corpus = []
    sql = "select * from T_Keywords"
    results = mysql.select(sql)
    for category in categories:
        words = ""
        for result in results:
            if result[2] == category:
                fool.load_userdict(dict)
                line = " ".join(fool.cut(result[3])[0])  #将每一类的分词拼接成一个字符串
                words = words+line
        corpus.append(words)

    exp = get_parses(word)      #获取当前词的解释

    fool.load_userdict(dict)
    expwords = " ".join(fool.cut(exp)[0]) #对解释进行切词
    corpus.append(expwords)

    vectorizer = CountVectorizer()
    csr_mat = vectorizer.fit_transform(corpus)
    transformer =TfidfTransformer()
    tfidf = transformer.fit_transform(csr_mat)
    y = np.array(categories)

    model = SVC()
    length = categories.__len__()
    model.fit(tfidf[0:length], y)
    predicted = model.predict(tfidf[length:])

    #对新查询到的词进行插入操作
    sql = "insert into T_Keywords(keyword,category,weight,explanation) values('%s','%s','%s','%s')" % (word, predicted[0],1,exp)
    kid = mysql.exec(sql)


    #爬取相关的链接并插入
    hrefs = get_policy(word)
    for href in hrefs:
        title = href.get('title')
        url = href.get('url')
        sql = "insert into T_Links(title,href,kid) values('%s','%s','%s')" % (title, url, kid)
        mysql.exec(sql)





if __name__ == '__main__':
    dict = "/Users/amos/Desktop/pythonProject/Chinese_segment_augment-master/data/dict2.txt"
    classify(sys.argv[1],dict)

