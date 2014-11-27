var geocoding = {
    markers:null,
    results:null,
    uplod: null,
    vhide: function(){
        var scope = this;
        if(document.getElementById("div_geosearch").style.visibility=="visible"){
            document.getElementById("div_geosearch").style.visibility="hidden";
            if (scope.markers && scope.markers.length) {
                for (var i = 0; i < scope.markers.length; i++) {
                    map.removeLayer(scope.markers[i])
                }
            }
        }else{
            document.getElementById("div_geosearch").style.visibility="visible";
            geocoding.init();
        }
    },
    init:function () {
        var scope = this;
        document.getElementById("btnSearch").onclick = scope.vhide
        var src = 'http://maps.google.com/maps/api/js?sensor=false';

        if (!scope.uplod) {
            scope.uplod = true;
            $.get( "php/geocoding.php", function( data ) {
                window['getScript'] = function(src){
                    var script = document.createElement('script');
                    script.src = src;
                    document.documentElement.appendChild(script);
                    script.onload = function() {

                        scope.coding();
                        $('#div_geosearch').draggable({ handle: ".title", cancel: '.cancel' })

                    }
                }

                eval(data);
            });
        }
    },
    coding:function () {
        var scope = this;
        var geocoder = new google.maps.Geocoder();
        var count = 0;

        $(function () {
            $("#address").autocomplete({
                //Определяем значение для адреса при геокодировании
                source:function (request, response) {
                    geocoder.geocode(
                        {
                            address:request.term,
                            region:'ru',
                            language: 'ru'

                        },
                        function (results, status) {
                            console.log(results)
                            scope.results = results;
                            scope.clearMarker();
                            count = 0;
                            scope.markers = [];

                            /*	var arr_addr = []
                             for(var i = 0; i<results.length; i++){
                             arr_addr.push(results[i].formatted_address)
                             }
                             response(arr_addr)*/


                            response($.map(results, function (item) {
                                scope.resMarker(item.geometry.location.lat(), item.geometry.location.lng(), count++);


                                return {
                                    label:item.formatted_address,
                                    value:item.formatted_address,
                                    latitude:item.geometry.location.lat(),
                                    longitude:item.geometry.location.lng()
                                }
                            }));
                        })
                },
                //Выполняется при выборе конкретного адреса
                select:function (event, ui) {
                    $("#latitude").val(ui.item.latitude);
                    $("#longitude").val(ui.item.longitude);
                    var lat = ui.item.latitude;
                    var lng = ui.item.longitude;

                    if (scope.markers && scope.markers.length) {
                        for (var i = 0; i < scope.markers.length; i++) {
                            map.removeLayer(scope.markers[i])
                        }
                    }
                    scope.markers = [];
                    scope.markers[0] = L.marker([lat, lng],{icon: dmarker}).addTo(map)
                    map.setView([lat, lng], 14)
                },
                focus:function (event, ui) {
                    map.panTo([ui.item.latitude, ui.item.longitude])
                }
            });
        });
    },
    clearMarker: function(){
        var scope = this;
        if(scope.markers && scope.markers.length){
            for(var i = 0; i < scope.markers.length; i++){
                map.removeLayer(scope.markers[i]);
            }
        }
        scope.markers = [];

    },
    resMarker: function(lat, lng, i){
        var scope = this;
        scope.markers[i] = L.marker([lat, lng], {icon: dmarker}).addTo(map)
    }
}