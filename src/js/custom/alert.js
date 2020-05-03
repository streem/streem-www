(function() {

    var alertTemplate = Handlebars.compile('<div class="alert {{style}}"><div class="alert-message">{{message}}</div><a href="{{details_url}}" target="_blank" class="btn btn-outline">Learn More</a><a href="javascript:void(0);" class="alert-close"></a></div>');

    function loadAlertData(callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", 'alert.json', true);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                callback(JSON.parse(rawFile.responseText));
            }
        }
        rawFile.send(null);
    }

    function updateAlertModal(alertModel) {
        if (alertModel.enabled && alertModel.id !== localStorage.getItem("last_alert_closed")) {
            // Remove any existing alerts from the page (We only support one active alert)
            var existingAlerts = document.querySelectorAll('.alert');
            for(var i = 0; i < existingAlerts.length; i++) {
                existingAlerts[i].parentNode.removeChild(existingAlerts[i]);
            }

            // Insert our new alert into the page
            document.body.classList.add('alert-active');
            document.body.insertAdjacentHTML('afterbegin', alertTemplate(alertModel));

            // Bind our close listener to the close button
            document.querySelector('.alert-close').addEventListener('click', function() {
                var activeAlert = document.querySelector('.alert');
                activeAlert.parentNode.removeChild(activeAlert);
                document.body.classList.remove('alert-active');

                localStorage.setItem('last_alert_closed', alertModel.id);
            });
        }
    }

    loadAlertData(updateAlertModal);

})();