# Simple web element selector

Did you ever think about the ability to make your custom ⌘ ⇧ C (inspect element) in your extension or tool? Yeah, we did too. And, of course, browsers doesn't provide any API to use it. Fortunately, we were looking for the same solution and finally wrote a small library.

### The benefits

- 🛠 Compatible with `<script>` and `import()` usage
- 🪶 Zero-dependent library, only native code
- ☄️ We use HTML5 Canvas to draw the selection, so it's fast
- 🍩 We use modern JavaScript, yummy
- 💫 It's asynchronous, no callbacks needed

## Installation

### Use it with NPM

```
npm i element-selector
```

### Use it with CDN

```
<script src="//cdn.jsdelivr.net/npm/element-selector@0.1.7/dist/main.js"></script>
```

## How to use

There are only 2 public methods

```js
let elementSelector = new ElementSelector();

/**
 * Toggle element selector interface
 * - use async/await
 * - use then callback
 */
let selectedElement = await elementSelector.togglePrompt();

/**
 * After you don't need it you can
 * destroy canvas and styles objects
 */
elementSelector.destroy();
```
