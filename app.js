(function(Snap) {

    function onReady(fn) {
        if (document.readyState != 'loading'){
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    function randomIntFromInterval(interval)
    {
        return Math.floor(Math.random()*(interval[1]-interval[0]+1)+interval[0]);
    }

    function loop(el, from, to, interval)
    {
        interval = interval || [1000, 2000];

        var forward = function() {
            var duration = randomIntFromInterval(interval);

            el.stop().animate({transform: from}, duration, mina.easeinout, function() {
                backward();
            });
        };

        var backward = function() {
            var duration = randomIntFromInterval(interval);

            el.stop().animate({transform: to}, duration, mina.easeinout, function() {
                forward();
            });
        };

        forward();
    }

    onReady(function() {
        var svg = Snap(".js-canvas");

        svg.attr({
            style: 'background: #DAEDAD;'
        });

        var foxContainer = svg.group();

        Snap.load('svg/fox.svg', function(foxFragment) {

            foxContainer.append(foxFragment);

            var fox = foxContainer.select('#fox').attr('transform', 's1');

            loop(fox.select('#tail'), 'r0', 'r-20 t-40,50');
            loop(fox.select('#ear_l'), 'r0', 'r-20 t-10,0');
            loop(fox.select('#ear_r'), 'r0', 'r-10 t-10,-10');
            loop(fox.select('#muzzle'), 'r0', 'r-5 t.5,-.5', [100, 500]);
        });

    })

})(Snap);
