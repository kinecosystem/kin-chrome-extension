import Vue from 'vue';
import Popup from './pages/Popup';


new Vue({
    el: '#app',
    data: {
        title: 'Kin Extension Popup'
    },
    render: h => h(Popup)
})