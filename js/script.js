(function(){

  var iframe = document.querySelector('iframe');
  var play = document.querySelector('#play');

  var msg = document.querySelector('h3');

  var params = _queryParameters(document.location.search);

  document.querySelector('form').addEventListener('submit', function(e) {
    var url = document.querySelector('input[name=url]');
    var from = parseInt(document.querySelector('input[name=from]').value);
    var to = parseInt(document.querySelector('input[name=to]').value);

    iframe.style.width = from;
    iframe.style.visibility = 'visible';
    iframe.src = url.value;

    msg.innerText = (from) + 'px';

    iframe.setAttribute('data-from', from);
    iframe.setAttribute('data-to', to);

    play.style.visibility = 'visible';

    e.preventDefault();
    return false;
  });

  play.addEventListener('click', function(e){
    var from = parseInt(document.querySelector('input[name=from]').value);
    iframe.style.width = from;

    var to = parseInt(document.querySelector('input[name=to]').value);
    var time = parseInt(document.querySelector('input[name=time]').value); // s

    var interval = 50; // ms
    var pixelVariation = to - from;

    var ratio = Math. floor((pixelVariation / (time * 1000)) * 50);
    if (ratio == 0) ratio = 1;

    setTimeout(function(){
      var newValue = (iframe.offsetWidth - 2) + ratio;
      if (newValue > to) {
        newValue = to;
      }
      iframe.style.width = newValue;

      msg.innerText = (newValue) + 'px';

      if (iframe.offsetWidth - 2 < to)
        setTimeout(arguments.callee, 50);
    }, 50);

    e.preventDefault();
    return false;
  });

  function _queryParameters(qs) {
    qs = qs.split("+").join(" ");

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
      params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
  }

  if (Object.keys(params).length) {
    if (params['from']) document.querySelector('input[name=from]').value = params['from'];
    if (params['to']) document.querySelector('input[name=to]').value = params['to'];
    if (params['time']) document.querySelector('input[name=time]').value = params['time'];
    if (params['url']) {
      document.querySelector('input[name=url]').value = params['url'];

      var event = document.createEvent("HTMLEvents");
      event.initEvent("submit", true, true);
      document.forms['toolbar'].dispatchEvent(event);
    }
  }

})();
