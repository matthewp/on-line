customElements.define('on-line', class extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode:'open'});

    let doc = this.ownerDocument;
    let mkSlot = name => {
      let slot = doc.createElement('slot');
      slot.setAttribute('name', name);
      return slot;
    };

    this._slotOnline = mkSlot('online');
    this._slotOffline = mkSlot('offline');
  }

  connectedCallback() {
    this._toggleSlots();
    let win = this.ownerDocument.defaultView;
    win.addEventListener('online', this);
    win.addEventListener('offline', this);
  }

  disconnectedCallback() {
    let win = this.ownerDocument.defaultView;
    win.removeEventListener('online', this);
    win.removeEventListener('offline', this);
  }

  handleEvent(ev) {
    this._toggleSlots();
    this._broadcast();
  }

  _broadcast() {
    let win = this.ownerDocument.defaultView;
    let online = win.navigator.onLine;
    let ev = new CustomEvent('change', {
      detail: online
    });
    this.dispatchEvent(ev);
  }

  _toggleSlots() {
    let win = this.ownerDocument.defaultView;
    let online = win.navigator.onLine;

    let set = (show, el) => {
      let root = this.shadowRoot;
      if(!show && el.parentNode !== null) {
        root.removeChild(el);
      } else if(show) {
        root.appendChild(el);
      }
    }

    if(online) {
      set(true, this._slotOnline);
      set(false, this._slotOffline);
    } else {
      set(false, this._slotOnline);
      set(true, this._slotOffline);
    }
  }
});
