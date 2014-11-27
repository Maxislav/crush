define(function () {
    return function (html) {
        var s = this;
        var item = $(document.createElement('div'));
        item.html(html);
        var viewport = item.find('.overview');
        var scrollbar = item.find('.scrollbar2');
        var buttonAdd = item.find('.add');
        var released= {};

        item.attr('class', 'sprite-region');
        $('body').append(item);
        item.css({
            height: $(window).height() - 10
        })

        scrollbar.height($(window).height() - 50)


        var UaCell;
        var geojson;
        var arrayCell = [];


        var cityDecode = {
            "Kiev": "Киев",
            "Kiev City": "Киев город",
            "Zhytomyr": "Житомир",
            "Rivne": "Ровно",
            "Volyn": "Волынь",
            "L'viv": "Львов",
            "Ternopil'": "Тернополь",
            "Khmel'nyts'kyy": "Хмельницкий",
            "Vinnytsya": "Винница",
            "Chernivtsi": "Черновцы",
            "Transcarpathia": "Закарпатье",
            "Ivano-Frankivs'k": "Ивано-Франковск",
            "Cherkasy": "Черкассы",
            "Kirovohrad": "Кировоград",
            "Dnipropetrovs'k": "Днепропетровск",
            "Zaporizhzhya": "Запорожье",
            "Donets'k": "Донецк",
            "Luhans'k": "Луганск",
            "Kharkiv": "Харьков",
            "Poltava": "Полтава",
            "Sumy": "Сумы",
            "Chernihiv": "Чернигов",
            "Kirovohrad": "Кировоград",
            "Mykolayiv": "Николаев",
            "Kherson": "Херсон",
            "Crimea": "Крым",
            "Odessa": "Одесса",
            "Sevastopol'": "Севастополь"
        };


        var defaulultStyle = {
            weight: 2,
            opacity: 1,
            color: 'red',
            dashArray: '3',
            fillOpacity: 0.4,
            fillColor: 'white'
        };
        var relasedStyle = {
            weight: 5,
            color: 'white',
            dashArray: '',
            opacity:0.7,
            fillOpacity: 0.6,
            fillColor: 'red'
        }

        var overStyleDefault = {
            weight: 5,
            color: 'red',
            dashArray: '',

            fillOpacity: 0.3,
            fillColor: 'red'
        };
        var overStyleReleased = {
            weight: 5,
            color: 'white',
            opacity:1,
            dashArray: '',
            fillOpacity: 0.9,
            fillColor: 'red'
        };

        function styleOut(feature) {
            feature
            if(released[feature.properties.NAME_1]){
                return relasedStyle;
            }
            return defaulultStyle;
        }
        function styleOver(feature){
            if(released[feature.properties.NAME_1]){
                return overStyleReleased;
            }
            return overStyleDefault
        }

        init();
        function init() {
            getJson();
            getReleased()
        }
        var c=0
        function next(){
           c++
            if(c==2){
                addToMap()
            }
        }

        function getReleased(){
            $.ajax({
                type: 'post',
                url:'php/released.php',
                success: function (d) {
                    //released = {}
                    try{
                        d = JSON.parse(d)
                    }catch (err){
                            console.log(err)
                    }
                    for(var i =0; i< d.length; i++){
                      released[d[i].city] ={
                          name:d[i].city,
                          id: d[i].id,
                          comment: d[i].comment
                      }
                    }
                    console.log(released)
                    next()
                },
                error: function (a, b) {
                    console.log(b)
                }
            })
        }


        function getJson(success) {
            $.getJSON('module/region/regionUA.json', function (json) {
                for (var i = 0; i < json.features.length; i++) {
                    json.features[i].properties.NAME_Ru = cityDecode[json.features[i].properties.NAME_1];
                }
                json.features = _.sortBy(json.features,
                    function (num) {
                        return num.properties.NAME_Ru
                    });
                UaCell = json;
                console.log(json);
               next()
            })
        }

        function addToMap() {
            geojson = L.geoJson(UaCell, {
                style: styleOut,
                onEachFeature: onEachFeature
            }).addTo(map);
            scrollbar.tinyscrollbar();

        }




        function onEachFeature(feature, layer) {



            // setRow(layer)
            /*layer.on({
             mouseover: highlightFeature,
             mouseout: resetHighlight,
             click: zoomToFeature
             });*/

            var row = $(document.createElement('div'));
            var ico = $(document.createElement('div'));
            var content = $(document.createElement('div'));
            ico.attr('class', 'ico-title');
            var title = $(document.createElement('div'));
            title.html(ico).attr('class', 'title');
            title.append(layer.feature.properties.NAME_Ru);


            var comment = released[feature.properties.NAME_1] ? released[feature.properties.NAME_1].comment : ''

            content.html(app.replaseHref(comment));
            content.attr('class', 'content');
            row.append(title).append(content);

            //  var h = scrollbar.find('.overview').height() - ($(window).height() - 50);
            // scrollbar && scrollbar.tinyscrollbar();
            row.attr('class', 'row');
            released[feature.properties.NAME_1] && row.addClass('released')

            viewport.append(row);

            events(layer, row, feature)
        }

        /*function replaseHref(text){
            var regexp = /http(.+)$|^http(.+)\s/g;
            var r = text.match(regexp) || [];
            if (r.length) {
                for (var i = 0; i < r.length; i++) {
                    var regdomen = /https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i;
                    var tag = text.match(regdomen) || [];
                    if (!tag.length) {
                        regdomen = /http?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i;
                        tag = text.match(regdomen) || [];
                    }
                    !tag.length && (tag[1] = 'href');
                    text =text.replace(r[i], '<a href="' + r[i] + '"  target="_blank">' + tag[1] + '</a>');
                }
            }
            return text
        }*/

        function events(layer, row, feature){
            row
                .hover(
                function () {
                    layer.setStyle(styleOver(feature));
                },
                function () {
                    layer.setStyle(styleOut(feature));
                })
                .click(function(){
                    add(feature, row, layer)
                })


            layer.on({
                mouseover: function(e){
                    mouseover(e, row, feature)
                },
                mouseout: function(e){
                    mouseout(e,row, feature)
                },
                click: function(){
                    add(feature, row , layer)
                }
            })
        }

        function add(feature, row, layer){
            require([
                'module/released/released',
                'text!module/released/comment.html'
            ], function(js, html){
                js(html, feature.properties.NAME_1, row, layer, released)
            })
        }


        function mouseover(e, row, feature) {
            row.addClass('hover');

            var h = scrollbar.find('.overview').height() - ($(window).height() - 50);
            if (h < 0) {
                scrollbar && scrollbar.tinyscrollbar_update(0)
            } else if (h < row.position().top) {
                scrollbar && scrollbar.tinyscrollbar_update(h)
            } else {
                scrollbar && scrollbar.tinyscrollbar_update(row.position().top)
            }


            var layer = e.target;
           // console.log(layer.feature.properties.NAME_Ru)
            layer.setStyle(styleOver(feature));

            if (!L.Browser.ie && !L.Browser.opera) {
                layer.bringToFront();
            }
        }

        function mouseout(e, row, feature) {
            row.removeClass('hover')
            var layer = e.target;

            layer.setStyle(styleOut(feature));

            if (!L.Browser.ie && !L.Browser.opera) {
                layer.bringToFront();
            }
        }
    }
})