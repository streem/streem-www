// (function() {

//     function computeFinalValue(sizeString) {
//         var height = window.innerHeight;
//         var width = window.innerWidth;

//         var vhunit = height / 100;
//         var vwunit = width / 100;

//         sizeString = sizeString.replace(/vw/g, '*' + vwunit).replace(/vh/g, '*' + vhunit);

//         return eval(sizeString);
//     }

//     function refreshStaticSizeElements() {
//         var elements = document.querySelectorAll('[data-resize-static]');
//         for(var i = 0; i < elements.length; i++) {
//             var ele = elements[i];
//             var sizeData = JSON.parse(ele.getAttribute('data-resize-static'));

//             for(var attr in sizeData) {

//                 ele.style[attr] = computeFinalValue(sizeData[attr]) + 'px';
//             }
//         }
//     }

//     // Setup our static rules (Moved from CSS)
//     [].slice.call(document.querySelectorAll('.container.stagger .column img')).map(function(ele) {
//         ele.setAttribute('data-resize-static', JSON.stringify({ maxHeight: "70vh" }));
//     });

//     window.onresize = refreshStaticSizeElements;
//     refreshStaticSizeElements();
// })();