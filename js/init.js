var map;

var f = parseFloat;

requirejs.config({
    waitSeconds: 60,
    baseUrl: '',

    paths: {
        app: 'js/app',
        jquery: 'lib/jquery/jquery-1.11.1.min',
        leaflet: 'lib/leaflet/leaflet',
        basemarker: 'module/basemarker/basemarker',
        text: 'lib/requirejs/text',
        build: 'build/scripts.min',
        addpoint: 'module/addpoint/addpoint',
        region: 'module/region/region',
        lodash: 'lib/lodash/lodash.compat.min'
    },

    shim:{
        app: {
            deps:[
                'build'
               // 'leaflet'
            ]
        }
    }
});
var app;
require([
"app"
], function(js){
    app = new js();
    app.init();
})