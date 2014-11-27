define(function () {
    return function (html) {
        var arraypoints;
        var addpoint = null;

        var item = $(document.createElement('div'));
        item.html(html);
        var viewport = item.find('.overview');
        var scrollbar = item.find('.scrollbar1');
        var buttonAdd = item.find('.add');

        item.attr('class', 'sprite-points');
        $('body').append(item);
        item.css({
            height: $(window).height() - 10
        })

        scrollbar.height($(window).height() - 50)

        //item.append(html)

        var myIcon = L.icon({
            iconUrl: 'img/5.10.png',
            iconSize: [30, 45],
            iconAnchor: [15, 45],
            popupAnchor: [0, -45]
        });


        $.ajax({
            url: 'php/getmarker.php',
            type: 'POST',

            success: function (d) {
                try {
                    arraypoints = JSON.parse(d);

                } catch (err) {
                    app.alert.show(null, d, function () {
                    })
                }
                setMarker(arraypoints)
            },
            error: function (a, b) {
                console.log(b)
            }
        })
        function setMarker(points) {
            for (var i = 0; i < points.length; i++) {
                setRow(points[i])
            }
            scrollbar.tinyscrollbar();

        }

        buttonAdd.on('click', function () {
            require([
                'addpoint',
                'text!module/addpoint/addpoint.html'
            ], function (js, html) {
                !addpoint && (addpoint = new js(html, setRow, scrollbar));
                addpoint.show();
            })
        })

        function setRow(point, success) {
            var row = $(document.createElement('div'));
            var latlng = [point.lat, point.lng];

            var ico = $(document.createElement('div'));
            ico.attr('class', 'ico-title');


            var title = $(document.createElement('div'));
            title.html(ico).attr('class', 'title');
            title.append(point.name);
            var content = $(document.createElement('div'));
            var regexp = /http(.+)$|^http(.+)\s/g;
            var r = point.popup.match(regexp) || [];
            if (r.length) {
                for (var i = 0; i < r.length; i++) {
                    var regdomen = /https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i;
                    var tag = point.popup.match(regdomen) || [];
                    if (!tag.length) {
                        regdomen = /http?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i;
                        tag = point.popup.match(regdomen) || [];
                    }
                    !tag.length && (tag[1] = 'href');
                    point.popup = point.popup.replace(r[i], '<a href="' + r[i] + '"  target="_blank">' + tag[1] + '</a>');
                }
            }
            content.html(point.popup).attr('class', 'content');
            row.append(title).append(content).attr('class', 'row');

            row
                .hover(function () {
                    map.panTo(latlng)
                })
                .click(function () {
                    map.setZoom(14)
                });

            viewport.prepend(row);
            var marker = L.marker(latlng, {icon: myIcon}).bindPopup(point.popup).addTo(map);
            marker.on('mouseover',function () {
                row.addClass('hover');
                // console.log(row.position().top)
                var h = scrollbar.find('.overview').height() - ($(window).height() - 50);
                if (h < 0) {
                    scrollbar && scrollbar.tinyscrollbar_update(0)
                } else if (h < row.position().top) {
                    scrollbar && scrollbar.tinyscrollbar_update(h)
                } else {
                    scrollbar && scrollbar.tinyscrollbar_update(row.position().top)
                }

            }).on('mouseout', function () {
                row.removeClass('hover')
            });

            ico.click(function () {
                // alert(point.id)
                delRow(point.id, row, marker)
            })
            success && success();
        }

        function delRow(id, row, marker) {
            app.alert.show('Подтвердите', 'Удалить ячейку?', function () {
                $.ajax({
                    type: 'post',
                    url: 'php/delpoint.php',
                    data: {
                        id: id
                    },
                    success: function (d) {
                        row.remove();
                        map.removeLayer(marker);
                        scrollbar.tinyscrollbar_update('relative')
                    },
                    error: function (a, b) {
                        console.log(b)
                    }
                })

            }, true)


        }
    }
})