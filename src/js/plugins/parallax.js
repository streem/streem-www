(function() {

    var watchedElements = null;
    var watchedGroups = null;

    function getBounds( el ) {
        var sy = window.scrollY || document.documentElement.scrollTop;
        var sx = window.scrollX || document.documentElement.scrollLeft;

        var bounds = el.getBoundingClientRect();
        bounds.top -= sy;
        bounds.left -= sx;

        var _y = bounds.top + sy;
        var _x = bounds.left + sx;
        
        var width = el.offsetWidth;
        var height = el.offsetHeight;

        return { top: _y, left: _x, width: width, height: height, bottom: _y + height, right: _x + width };
    }

    // We don't want to spam this expensive function if we don't need to so we add a short delay
    // if this event is called too quickly.
    var refreshTimeout = 0;
    function refreshElementMaps(callback) {
        var winHeight = window.innerHeight;
        var revealBuffer = winHeight * 0.1;
        var elements = [];
        var focusGroups = {};

        clearTimeout(refreshTimeout);
        refreshTimeout = setTimeout(function() {
            var activeElements = document.querySelectorAll('.parallax, .cta');
            for(var i = 0; i < activeElements.length; i++) {
                var ele = activeElements[i];
                var bounds = getBounds(ele);

                var attemptPlay = false;
                if (ele.getAttribute('data-play') !== null) attemptPlay = true;

                var focusGroup = ele.getAttribute('data-focus-group');
                var speed = parseFloat(ele.getAttribute('data-speed'));
                var opacity = parseFloat(ele.getAttribute('data-opacity'));
                if (isNaN(speed)) speed = 0;
                if (isNaN(opacity)) opacity = 0;

                var animStart = bounds.top - winHeight;
                var animEnd = bounds.bottom;

                if (speed !== 0) {
                    var offset = (animEnd - animStart) * speed;
                    if (offset > 0)
                        animEnd += offset;
                    else
                        animStart += offset;
                }

                var scrollStart = Math.max(animStart, 0);
                var scrollEnd = animEnd;

                var alreadyRevealed = (ele.className.indexOf('reveal') !== -1);
                var alreadyFocused = (ele.className.indexOf('focus') !== -1)

                var node = {
                    isDirty: false,
                    isRevealed: alreadyRevealed,
                    isFocused: alreadyFocused,
                    ele: ele,
                    bounds: bounds,
                    speed: speed,
                    opacityChange: opacity,
                    focusStart: Math.max(animStart + revealBuffer, 0),
                    focusEnd: animEnd - revealBuffer,
                    scrollStart: scrollStart,
                    scrollEnd: scrollEnd,
                    scrollLength: scrollEnd - scrollStart,
                    shouldPlay: attemptPlay,
                    group: focusGroup
                };

                if (typeof(focusGroup) === 'string') {
                    if (typeof(focusGroups[focusGroup]) === 'undefined') {
                        focusGroups[focusGroup] = [];
                    }

                    focusGroups[focusGroup].push(node);
                }

                elements.push(node);
            }
            
            watchedElements = elements;
            watchedGroups = focusGroups;

            if (typeof callback === 'function') callback();
        }, 100);
    }

    function focusNode(node, inFocus, handleGroups) {

        var focusChanged = false;
        if (inFocus && !node.isFocused) {
            node.isFocused = true;
            node.ele.className += ' focus';

            if (node.shouldPlay) node.ele.play();

            focusChanged = true;

        } else if (!inFocus && node.isFocused) {
            node.isFocused = false;
            
            node.ele.className = node.ele.className.replace(/\s?focus/g, '');
            if (node.shouldPlay) {
                node.ele.pause();
                node.ele.currentTime = 0;
            }

            focusChanged = true;
        }

        if (focusChanged && handleGroups && node.group) {
            var groupNodes = watchedGroups[node.group];
            for(var i = 0; i < groupNodes.length; i++) {
                var otherNode = groupNodes[i];
                if (otherNode == node) continue;
                focusNode(otherNode, !inFocus, false);
            }
        }
    }

    function updateElements() {
        if (watchedElements != null) {
            var y = window.scrollY || document.documentElement.scrollTop;

            for(var i = 0; i < watchedElements.length; i++) {
                var node = watchedElements[i];
                var inFocus = false;

                var inScrollZone = (y >= node.scrollStart && y <= node.scrollEnd);
                var isDirty = node.isDirty;

                if (inScrollZone || isDirty) {
                    node.isDirty = true;
                    inFocus = (y >= node.focusStart && y <= node.focusEnd);
                    
                    // Is this our first time in focus? Reveal the element by adding a class.
                    if (node.isRevealed === false && inFocus) {
                        node.isRevealed = true;
                        node.ele.className += ' reveal';
                    }    

                    var distance = y - node.scrollStart;
                    var percent = distance / node.scrollLength;
                   
                    if (node.speed !== 0) {
                        var offset = distance * node.speed;
                        node.ele.style.transform = 'translate(0, ' + offset + 'px)';
                    }

                    if (percent > 0 || isDirty) {
                        if (node.opacityChange !== 0) {
                            node.ele.className = node.ele.className.replace(/animate/g, '');
                            node.ele.style.opacity = 1.0 + (node.opacityChange * percent);
                        }
                    }

                    if (isDirty && !inScrollZone) {
                        node.isDirty = false;
                        node.ele.style.transform = '';
                    }
                }

                focusNode(node, inFocus, true);
            }
        }
    }

    var lastObservedSize = { w: 0, h: 0 };
    setInterval(function() {
        var b = document.body;
        var w = b.offsetWidth;
        var h = b.offsetHeight;

        if (lastObservedSize.w != w || lastObservedSize.h != h) {
            lastObservedSize.w = w;
            lastObservedSize.h = h;

            refreshElementMaps(updateElements);
        }
    }, 50);

    // Update our parallax on scroll
    window.addEventListener('scroll', updateElements);
})();