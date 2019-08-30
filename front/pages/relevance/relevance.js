// pages/relevance/relevance.js
import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var option = {
    color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
    title: {
      text: '物联网'
    },
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        type: 'graph',
        layout: 'force',
        symbolSize: 50,
        roam: true,
        label: {
          normal: {
            show: true
          }
        },
        force:{
          repulsion:600,
          edgeLength:250,

        },
        draggable:true,
        // edgeSymbol: ['circle', 'arrow'],
        // edgeSymbolSize: [4, 10],
        edgeLabel: {
          normal: {
            textStyle: {
              fontSize: 20
            }
          }
        },
        data: [{
          name: '云计算',
          x: 300,
          y: 300,
          itemStyle: {
            color: '#37A2DA'
          }
        }, {
          name: '物联网',
          x: 800,
          y: 300,
          itemStyle: {
            color: '#32C5E9'
          }
        }, {
          name: '大数据',
          x: 550,
          y: 100,
          itemStyle: {
            color: '#9FE6B8'
          }
        }, {
          name: '人工智能',
          x: 550,
          y: 500,
          itemStyle: {
            color: '#FF9F7F'
          }
        }],
        // links: [],
        links: [{
          source: '人工智能',
          target: '云计算',
          lineStyle: {
            normal: { curveness: 0.2 }
          }
        }, {
          source: '人工智能',
          target: '大数据'
        }, {
          source: '人工智能',
          target: '物联网'
        }, {
          source: '人工智能',
          target: '云计算'
        }],
        lineStyle: {
          normal: {
            opacity: 0.9,
            width: 2,
            curveness: 0.2
          }
        }
      }
    ]
  };
  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/relevance/relevance',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit: initChart
    }
  },

  onLoad(options){
    let that = this
    console.log(options.id)
    //获取词条
    wx.request({
      url: app.globalData.host + 'getWord?id=' + options.id,
      success(res) {
        console.log(res.data)
        //option.title.text = res.data.key + "关系图"
        //initChart()
      },
      fail(res) {
        console.log(res.data)
      }
    })
  },

  onReady() {
  }
});
