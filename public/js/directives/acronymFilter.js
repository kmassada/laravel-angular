angular.module('taskApp')
	.filter('acronym', acronym);

function acronym() {
        return function (text) {
            if (text.length<=0) {
                return text;
            }

            var acr = [];

            var res = text.split(" ");
            text = res.map(function(word) {
                var str = String(word).substring(0,1) + '.';
                acr.push(str);
            });

            return acr.join(" ");
        };
    }
