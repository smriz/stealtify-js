# 🔒 JavaScript Obfuscator

Hey nanba!, your JavaScript code is sitting there completely open for anyone to read and copy. Not anymore! This tool will protect your hard work through multiple transformation techniques. Production-ready and very powerful.

## 🚀 What All It Does

- **String Concealment** — Hides all your strings inside arrays with accessor functions. Nobody will understand what is happening
- **Identifier Renaming** — All your variable and function names get converted to total nonsense names. Very confusing for reverse engineers
- **Number Obfuscation** — Simple numbers become complex mathematical expressions. `5` becomes something like `(3*2-1)`. Genius!
- **Control Flow Flattening** — Your program flow becomes so complicated that reading it gives headache only
- **CLI Interface** — Simple command line usage, no rocket science required
- **Configurable** — You can enable or disable specific transformations as per your requirement

## 📦 Installation

First time setup is very simple only:

```bash
# Install globally (recommended)
npm install -g stealthify

# Or if you want locally in your project
npm install stealthify
```

> **Note:** Node.js should be installed already. If not, first go install it from nodejs.org, then come back here.

## 🛠️ How to Use

```bash
# Basic usage
stealthify input.js -o output.js

# With specific options
stealthify input.js -o output.js --strings --rename --numbers
```

## ⚙️ Configuration Options

| Option      | What it does           | Default |
| ----------- | ---------------------- | ------- |
| `--strings` | Hide strings in arrays | `true`  |
| `--rename`  | Rename identifiers     | `true`  |
| `--numbers` | Obfuscate numbers      | `true`  |
| `--flatten` | Flatten control flow   | `false` |

## 💡 Simple Example

**Before obfuscation:**

```javascript
function greetUser(name) {
  console.log("Hello, " + name);
}
```

**After obfuscation:**

```javascript
var _0x3f2a=['Hello,\x20','log'];
(function(_0x1b2c,_0x4e5f){...}(_0x3f2a,0x1a3));
function _0x2b1a(_0x9c8d){console[_0x4e5f(0x0)](_0x4e5f(0x1)+_0x9c8d);}
```

See? Completely unreadable. Your code is now safe!

## 🤔 Common Doubts

**Q: Will my code still work after obfuscation?**  
Yes yes, functionality is 100% same. Only readability is gone.

**Q: Can I reverse it?**  
Technically possible but very difficult and time-consuming. That is the whole point na?

**Q: Will it slow down my application?**  
Very minimal impact only. For most use cases you won't even notice.

## 🐛 Found a Bug?

Please open an issue on GitHub. Describe the problem properly with example code - "it's not working" is not helpful, nanba.

## 🤝 Want to Contribute?

PRs are welcome! Just make sure your code is clean (ironic, we know 😄) and tests are passing.

## 📄 License

MIT License — Use freely, but please don't use for any illegal purposes. Be responsible!

---

Made with ❤️ | If this saved your code, do give a ⭐ on GitHub!
