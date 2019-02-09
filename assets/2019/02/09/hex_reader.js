(function() {
  var $ = function(selector) {
    return document.querySelector(selector);
  };
  var createEle = document.createElement.bind(document);
  function createByteContainer() {
    var container = createEle('div');
    return container;
  }
  function createBinaryDOM(hex) {
    var dom = createEle('div');
    dom.className = 'binary-container';
    dom.textContent = hex.toString(2).padStart(8, '0');
    return dom;
  }
  function createByteContent(hex) {
    var dom = createEle('div');
    dom.className = 'byte-content';
    dom.textContent = hex.toString(16).padStart(2, '0');
    return dom;
  }
  function createChar(hex) {
    var dom = createEle('div');
    dom.className = 'char-content';
    if (hex < 31 || hex > 126) {
      dom.innerHTML = '&middot;';
    } else if (hex === 32) {
      dom.innerHTML = '&nbsp;';
    } else {
      dom.textContent = String.fromCharCode(hex);
    }
    return dom;
  }
  function createByte(hex) {
    var container = createEle('div');
    container.className = 'byte-container';
    var byte = createByteContent(hex);
    var char = createChar(hex);
    container.appendChild(byte);
    container.appendChild(char);
    var binaryDOM;
    container.addEventListener('mouseover', function() {
      binaryDOM = createBinaryDOM(hex);
      container.appendChild(binaryDOM);
    });
    container.addEventListener('mouseout', function() {
      if (binaryDOM) {
        container.removeChild(binaryDOM);
        binaryDOM = void 0;
      }
    });
    return container;
  }
  function renderByte(byte, container) {
    var byteDOM = createByte(byte);
    var group;
    if (!container.childElementCount) {
      group = createEle('div');
      group.className = 'byte-group';
      container.appendChild(group);
    }
    if (container.lastElementChild.childElementCount >= 16) {
      group = createEle('div');
      group.className = 'byte-group';
      container.appendChild(group);
    } else {
      group = container.lastElementChild;
    }
    group.appendChild(byteDOM);
  }
  function renderBytes(bytes, container) {
    var frag = document.createDocumentFragment();
    bytes.forEach(function(byte) {
      renderByte(byte, frag);
    });
    while (container.lastChild) {
      container.removeChild(container.lastChild);
    }
    container.appendChild(frag);
  }
  function main() {
    var container = createByteContainer();
    // var bytes = [
    //   0x1a,
    //   0x2f,
    //   0x10,
    //   0x4d,
    //   0x2f,
    //   0x89,
    //   0xe7,
    //   0xf0,
    //   0x5b,
    //   0x5a,
    //   0x31,
    //   0x36,
    //   0x40,
    //   0x2f,
    //   0xa8
    // ];
    // renderBytes(bytes, container);
    var root = $('#root');
    root.appendChild(container);
    function renderBinaryFile() {
      var file = $('#binaryFile').files[0];
      if (!file) {
        return;
      }
      var reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = function(event) {
        var bytes = new Uint8Array(event.target.result);
        renderBytes(bytes, container);
      };
      reader.onerror = function() {
        console.log('file reader error');
      };
    }
    function renderHexStream() {
      var hexstream = $('#hexStream').value;
      if (!hexstream) {
        return;
      }
      var bytes = [];
      var i;
      var byte = '';
      for (i = 0; i < hexstream.length; ++i) {
        byte += hexstream[i];
        if (byte.length > 1) {
          bytes.push(parseInt(byte, 16));
          byte = '';
        }
      }
      renderBytes(bytes, container);
    }
    $('#render').addEventListener('click', function() {
      renderBinaryFile();
      renderHexStream();
    });
  }
  document.addEventListener('DOMContentLoaded', main);
})();
