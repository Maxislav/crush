define(function(){
    return function(html, setRow,scrollbar){
        var s = this;
        var el = null;
        var buttonPick = null;
        var inputLat;
        var inputLng;
        var f = parseFloat;
        var lat, lng;
        var _buttonPick;
        var buttonSave;
        var buttonCancel;
        var marker;
        var textareaComment;
        var inputCity;

        var myIcon = L.icon({
            iconUrl: 'img/5.10.png',
            iconSize: [30, 45],
            iconAnchor: [15, 45],
            popupAnchor: [0, -45]
        });
        function init(success){
            el = $(document.createElement('div'))
            el.attr('class', 'addpoint');
            el.html(html);

            $('body').append(el);

            buttonPick = el.find('.pick');
            inputLat = el.find('input[name=lat]');
            inputLng = el.find('input[name=lng]');
            buttonSave= el.find('.button-ok');
            buttonCancel = el.find('.button-cancel');
            textareaComment = el.find('textarea');
            inputCity = el.find('input[name=city]')
            events();

            success();

        }
        this.show = function(){
            if(!el){
                init(s.show);
                return
            }
            el.css({
                display: 'block'
            }).fadeTo(222,1);
        }
        function hide(){
            el.fadeTo(222,0,function(){
                el.css({
                    display: 'none'
                })
            })


        }
        function events(){
            el.find('.close').click(function(){
                hide();
            })
            if(!_buttonPick){
                buttonPick.on('click', clickPick);
                _buttonPick =true
            }
            buttonCancel.on('click', clear);
            buttonSave.on('click', save)
        };
        function clear(){
            hide();
            inputLat.val('');
            inputLng.val('');
            lat = null;
            lng = null;
            map.off('mousemove',mousemove);
            map.off('click', mapClick);
            _buttonPick = null;
            if(!_buttonPick){
                buttonPick.on('click', clickPick);
                _buttonPick =true
            }
            textareaComment.val('');
            marker && map.removeLayer(marker);
            marker = null;
            inputCity.val('');
            el.off('mouseleave')
        }
        function clickPick(){
            buttonPick.off('click',clickPick);
            _buttonPick = null;
            el.on('mouseleave', function(){
                map.on('mousemove',mousemove);
                map.on('click', mapClick);
            }).on('mouseenter', function(){
                map.off('mousemove',mousemove);
                map.off('click', mapClick);
            })

        }
        function mousemove(e){
           inputLat.val(f(e.latlng.lat).toFixed(5));
           inputLng.val(f(e.latlng.lng).toFixed(5));
        }
        function mapClick(e){
            map.off('mousemove',mousemove)
            inputLat.val(f(e.latlng.lat).toFixed(5));
            inputLng.val(f(e.latlng.lng).toFixed(5));
            if(!_buttonPick){
                buttonPick.on('click', clickPick);
                _buttonPick =true
            }
            lat = e.latlng.lat;
            lng =e.latlng.lng;
            setMaker(e.latlng)
        }

        function setMaker(latlng){
            if( !marker){
                marker =  L.marker(latlng, {icon: myIcon}).bindPopup(textareaComment.val()).addTo(map)
            }else{
                marker.setLatLng(latlng).bindPopup(textareaComment.val())
            }
        }

        function save(){
            if(lat && lng && textareaComment.val() && inputCity.val()){

            }else{
                app.alert.show('Операция невозможна', 'Одно или несколько полей не заполнены', function(){})
                return;
            }


            var data ={
                lat: lat,
                lng: lng,
                popup: textareaComment.val(),
                name:inputCity.val()
            }
            clear();
            $.ajax({
                type: 'post',
                url: 'php/addpoint.php',
                data: data,
                success: function(d){
                    data.id = d;
                    setRow(data, function(){
                        scrollbar.tinyscrollbar_update();
                    })
                },
                error: function(a, b){
                    console.log(b)
                }
            })
        }
    }
})