package com.tunan.service;

import com.tunan.dao.WordDao;
import com.tunan.domain.Word;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service(value = "wordService")
public class WordServiceImpl implements  WordService {

    @Autowired
    private WordDao wordDao;
    @Override
    public Word getWord(int id) {
        return wordDao.getWord(id);
    }
    @Override
    public Word getWordByWord(String word) {
        return wordDao.getWordByWord(word);
    }
    @Override
    public List<Word> getWords(Integer start, Integer num) {
        return wordDao.getWords(start,num);
    }
    @Override
    public List<Word> searchWords(String key){
        return wordDao.searchWords(key);
    }
    @Override
    public List<Word> mindWords(String key){
        return wordDao.searchWords(key);
    }
    @Override
    public List<Word> getWordsByCategory(Integer category, Integer start, Integer num) {
        return wordDao.getWordsByCategory(category,start,num);
    }
}
