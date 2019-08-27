import Vue from 'vue';
import Options from './pages/Options';


new Vue({
    el: '#app',
    data: {
        title: 'Kin Extension Options'
    },
    render: h => h(Options)
})