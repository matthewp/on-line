import '../online.js';

describe('<on-line>', function(){
  function set(val) {
    Object.defineProperty(navigator, 'onLine', {
      value: val,
      configurable: true
    });
    let ev = new Event(val ? 'online' : 'offline');
    window.dispatchEvent(ev);
  }

  beforeEach(function(){
    let tmpl = document.querySelector('template');
    let frag = document.importNode(tmpl.content, true);
    host.appendChild(frag);
  });

  afterEach(function(){
    host.innerHTML = '';
  });

  it('Shows as online when online', function(){
    set(true);
  });
})
