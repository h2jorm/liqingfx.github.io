(function() {
  document.addEventListener('DOMContentLoaded', main);
  var $ = function(selector) {
    return document.querySelector(selector);
  };
  function getAlgs() {
    var algs = [];
    var items = document.querySelectorAll('h3');
    var i;
    for (i = 0; i < items.length; ++i) {
      algs[i] = items[i].querySelector('a').textContent;
    }
    return algs;
  }
  function updateAlg() {
    var algs = getAlgs();
    var algIndex = Math.floor(Math.random() * algs.length);
    var alg = algs[algIndex];
    var container = $('#algsBlock div');
    var tpl = '今日算法：<a href="#$name">$name</a>';
    container.innerHTML = tpl.replace(/\$name/g, alg);
  }
  function main() {
    var container = $('#algsBlock');
    var btn = document.createElement('button');
    btn.textContent = '换一换';
    btn.addEventListener('click', updateAlg);
    btn.style.fontSize = '12px';
    btn.style.cursor = 'pointer';
    var text = document.createElement('div');
    container.style.display = 'flex';
    container.style.justifyContent = 'space-between';
    container.appendChild(text);
    container.appendChild(btn);
    updateAlg();
  }
})();
