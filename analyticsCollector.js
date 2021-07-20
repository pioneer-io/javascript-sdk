const fetch = require("node-fetch");
const axios = require("axios");

const ua = require("universal-analytics");

class AnalyticsCollector {
  constructor({ trackingId, clientId = '555' }) {
    this.visitor = ua(trackingId);
    this.trackingId = trackingId;
    this.clientId = clientId;
  }

  logEvent({ category, action, label, value }) {
    this.visitor.event(category, action, label, value, (err) => {
      console.log("Error loggin google analytics event", err);
    });
    // const trackingId = this.trackingId;
    // const clientId = this.clientId;
    // const data = {
    //   v: '1',
    //   tid: 'UA-180235909-1',
    //   cid: '555',
    //   t: 'event',
    //   ec: 'test',
    //   ea: 'print',
    //   el: 'login',
    //   ev: '1'
    // }
    // const payload = `v=${data.v}&tid=${data.tid}&cid=${data.cid}&t=${data.t}&ec=${data.ec}&ea=${data.ea}&el=${data.el}&ev=${data.ev}`;
    // console.log(payload);
    // axios.get('https://www.google-analytics.com/collect?' + encodeURI(payload))
    // .then(response => {
    //   console.log(JSON.stringify(response.data));
    // }).catch((err) => {
    //   console.log(err);
    // });
  }
}

module.exports = AnalyticsCollector