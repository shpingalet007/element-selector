class ElementSelector {
  styles = ElementSelector.#constructStyles();
  canvas = ElementSelector.#constructCanvas();

  targetElem;
  interval;
  toggled;

  constructor() {
    this.#initListeners();
  }

  async togglePrompt() {
    const ctx = this.canvas.getContext("2d");

    this.canvas.classList.add("enabled");

    this.toggled = true;

    return new Promise((resolve) => {
      document.addEventListener("mousedown", () => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.classList.remove("enabled");
        this.toggled = false;
        resolve(this.targetElem);
      });
    });
  }

  destroy() {
    this.styles.remove();
    this.canvas.remove();

    clearInterval(this.interval);
    this.toggled = false;
  }

  #detectElement() {
    const elem = document.elementsFromPoint(this.cursor.x, this.cursor.y)[1];

    if (!elem) {
      return;
    }

    this.#changeTargetElem(elem);
    this.#drawSelectionBox(elem);
  }

  #changeTargetElem(elem) {
    if (this.targetElem === elem) {
      return;
    }

    if (ElementSelector.#isElemAnimated(elem) && !this.interval) {
      // TODO: Make dynamic screen Hz rendering
      this.interval = setInterval(() => this.#drawSelectionBox(elem), 16);
    } else {
      clearInterval(this.interval);
      this.interval = null;
    }

    this.targetElem = elem;
  }

  #drawSelectionBox(elem) {
    const ctx = this.canvas.getContext("2d");

    const elemCoords = elem.getBoundingClientRect();

    const topCoord = Math.round(elemCoords.top) + 0.5;
    const rightCoord = Math.round(elemCoords.right) + 0.5;
    const bottomCoord = Math.round(elemCoords.bottom) + 0.5;
    const leftCoord = Math.round(elemCoords.left) + 0.5;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.setLineDash([3, 2]);

    ctx.fillStyle = "#569dd941";
    ctx.fillRect(
      leftCoord,
      topCoord,
      rightCoord - leftCoord,
      bottomCoord - topCoord
    );

    ctx.strokeStyle = "#7508cb";

    ctx.beginPath();
    ctx.moveTo(0, topCoord);
    ctx.lineTo(this.canvas.width, topCoord);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, bottomCoord);
    ctx.lineTo(this.canvas.width, bottomCoord);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(leftCoord, 0);
    ctx.lineTo(leftCoord, this.canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(rightCoord, 0);
    ctx.lineTo(rightCoord, this.canvas.height);
    ctx.stroke();
  }

  #updateCanvas() {
    const canvas = this.canvas;

    canvas.setAttribute("width", canvas.clientWidth.toString());
    canvas.setAttribute("height", canvas.clientHeight.toString());
  }

  #initListeners() {
    document.addEventListener(
      "mousemove",
      (e) => {
        this.cursor = { x: e.clientX, y: e.clientY };

        if (this.toggled) {
          this.#detectElement();
        }
      },
      { passive: true }
    );

    document.addEventListener("scroll", () => {
      if (this.toggled) {
        this.#detectElement();
      }
    });

    document.addEventListener("mouseout", () => {
      if (this.toggled) {
        this.canvas.classList.remove("enabled");
      }
    });

    document.addEventListener("mouseover", () => {
      if (this.toggled) {
        this.canvas.classList.add("enabled");
      }
    });

    window.addEventListener("resize", () => {
      this.#updateCanvas();
    });
  }

  static #constructStyles() {
    const style = document.createElement("style");
    style.innerHTML = `
          #element-selector {
            display: none;
            z-index: calc(9e999);
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }

          #element-selector.enabled {
            display: block;
          }
        `;
    document.getElementsByTagName("head")[0].appendChild(style);

    return style;
  }

  static #constructCanvas() {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "element-selector");

    canvas.classList.add("enabled");

    const lastChild = document.body.lastChild;
    document.body.insertBefore(canvas, lastChild);

    canvas.setAttribute("width", canvas.clientWidth.toString());
    canvas.setAttribute("height", canvas.clientHeight.toString());

    canvas.classList.remove("enabled");

    return canvas;
  }

  static #isElemAnimated = (elem) => elem.getAnimations().length > 0;
}

export default ElementSelector;
