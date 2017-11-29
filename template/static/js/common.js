function loadStyle(url) {var link = document.createElement("link");link.type = "text/css";link.rel = "stylesheet";link.href = url;document.getElementsByTagName("head")[0].appendChild(link);}
function loadScript(url, callback, options) {
  var resolve0, reject0;
  var script = document.createElement("script");
  script.type = "text/javascript";
  options = options || {}
  if (options.async) {
    script.async = true
  }

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState == "loaded" ||
        script.readyState == "complete") {
          script.onreadystatechange = null;
          if (typeof callback === 'function') {
            callback()
          } else if (typeof resolve0 === 'function') {
            resolve0();
          }
        }
    };
  } else {
    script.onload = function () {
      if (typeof callback === 'function') {
        callback()
      } else if (typeof resolve0 === 'function') {
        resolve0();
      }
    };
  }
  script.src = url;
  document.body.appendChild(script);
  if (typeof callback !== 'function') {
    return new Promise(function (resolve, reject) {
      resolve0 = resolve
    });
  }
}

function loadScripts() {
  if (arguments.length < 1) {
    return
  }
  var arg = arguments[0], promise = null;
  if (Object.prototype.toString.call(arg) === '[object Array]') {
    var ps = [];
    for (var i=0; i<arg.length; i++) {
      ps.push(loadScript(arg[i]))
    }
    promise = Promise.all(ps)
  } else if (typeof arg === 'string') {
    promise = loadScript(arg)
  } else if (typeof arg === 'function') {
    arg()
  }
  if (arguments.length > 1) {
    var args = Array.prototype.slice.call(arguments, 1);
    if (promise) {
      promise.then(function () {
        loadScripts.apply(window, args);
      });
    } else {
      loadScripts.apply(window, args);
    }
  }
}
