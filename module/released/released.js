define(function () {
    return function (html, city, row, layer, _released) {
        var el = $(document.createElement('div'))
        el.html(html)
        var elTextarea = el.find('textarea');
        elTextarea.css({
            width: '100%',
            height: 100
        })
        app.alert.show(
            'Освободить от налогов?',
            el,
            released,
            true
        )

        function released() {
            var comment = elTextarea.val();

            if(!comment){
                app.alert.show(
                    'Ошибка!',
                    'Контакты не заполнены',
                    function(){

                    }
                )
                return
            }
            $.ajax({
                type: 'post',
                url: 'php/addreleased.php',
                data: {
                    city: city,
                    comment: elTextarea.val()
                },
                success: function (d) {
                    if (d == 'err') {
                        no()
                    } else {
                        ok(comment)
                    }
                },
                error: function (err) {
                    console.log(err)
                }
            })
        }

        function no() {
            app.alert.show(
                'Ошибка!',
                'Область уже освобождена',
                function () {

                }
            )
        }

        function ok(comment) {
            row.find('.content').html(app.replaseHref(comment));
            layer.setStyle({
                weight: 5,
                color: 'white',
                dashArray: '',
                fillOpacity: 0.6,
                fillColor: 'red'
            })
            _released[city] = {
                name: city,
                comment: comment
            }
            row.addClass('released')
        }
    }
})