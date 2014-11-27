define(function () {
    return function () {
        var s = this;
        var osm, ggl, gglsats;


        this.init = function () {
            initmap();
            events();
            setRegion();
            setMarker();
        };


        function initmap() {
            map = L.map('maped').setView([48.9, 30.49], 6);

            osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
            ggl = new L.TileLayer('http://mt0.googleapis.com/vt/lyrs=m@207000000&hl=ru&src=api&x={x}&y={y}&z={z}&s=Galile', {maxZoom: 18, minZoom: 3});
            gglsats = new L.TileLayer('https://khms1.google.com/kh/v=142&src=app&x={x}&s=&y={y}&z={z}&s=Gali', {maxZoom: 18, minZoom: 3});
            map.addLayer(ggl);
            var baseLayers = {'OSM': osm, 'Google': ggl, 'Google sat': gglsats  };
            var layerControl = L.control.layers(baseLayers);
            layerControl.addTo(map);
        };

        function setRegion() {
            require([
                'region',
                'text!module/region/sprite.html'
            ], function (js, html) {
                new js(html)
            })
        }

        function setMarker() {
            require([
                'basemarker',
                'text!module/basemarker/sprite.html'
            ], function (js, html) {
                new js(html);
            })
        }

        function events() {
            var popup = L.popup()

            document.onkeydown = function (e) {
                e = e || window.event;
                if (e.shiftKey) {
                    map.on('click', getLatLng)
                    map.on('mousemove', getLatLng);

                }
            }
            document.onkeyup = function (e) {
                e = e || window.event;
                if (e.keyCode == 16) {
                    map.off('mousemove', getLatLng);
                    map.off('click', getLatLng)
                    map.removeLayer(popup)
                }
            }

            function getLatLng(e) {
                if (popup._isOpen) {
                    popup.setLatLng(e.latlng).
                        setContent("   " + f(e.latlng.lat).toFixed(4)).
                        update();
                } else {
                    popup.setLatLng(e.latlng).
                        setContent("   " + f(e.latlng.lat).toFixed(4) + ": " + f(e.latlng.lng).toFixed(4)).
                        addTo(map);
                }
            }
        };
        this.replaseHref = function(text){
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
        }

        this.alert = new function () {

            this.show = function (_title, _mess, _ok, _cancel) {
                init(_title, _mess, _ok, _cancel, function (el) {
                    el.fadeTo(222, 1);
                });
            }
            function init(_title, _mess, _ok, _cancel, success) {
                var el;
                var elclose;
                var eltitle;
                var elcomment;
                var elok, elcancel;
                var title, mess, ok, cancel;
                title = _title;
                mess = _mess;
                ok = _ok;
                cancel = _cancel;

                require([
                    'text!items/alert.html'
                ], function (html) {
                    el = $(document.createElement('div'));
                    el.attr('class', 'alert');
                    el.append(html);
                    el.height($(window).height());
                    eltitle = el.find('.title-alert');


                    eltitle.html(title ? title : 'Alert');
                    elcomment = el.find('.comment');
                    elcomment.html(mess);

                    $('body').append(el);
                    elclose = el.find('.close');

                    elclose.on('click', function () {
                        close(el)
                    })
                    if (ok) {
                        elok = $(document.createElement('div'));
                        elok.html('Ok').attr('class', 'ok');
                        el.find('.container-button').append(elok);
                        elok.on('click', function () {
                            ok && ok();
                            close(el);
                        })
                    }
                    if (cancel) {
                        elcancel = $(document.createElement('div'));
                        elcancel.html('Cancel').attr('class', 'cancel');
                        el.find('.container-button').append(elcancel);
                        elcancel.on('click', function () {
                            close(el);
                        })
                    }

                    success && success(el);
                })
            }

            function close(el) {
                el.fadeTo(222, 0, function () {
                    el.remove();
                    el = null;
                })
            }
        }
    }
})


