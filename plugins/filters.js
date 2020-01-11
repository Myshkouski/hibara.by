import Vue from 'vue'

Vue.filter('uppercase', string => ('' + string).toUpperCase())