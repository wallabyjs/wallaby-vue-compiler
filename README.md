Wallaby.js compiler to display code coverage in single file `.vue` components. Accepts another compiler (for the script section compilation) as a parameter.

```javascript
module.exports = function (wallaby) {

  return {
    ...

    compilers: {
      ...
      '**/*.vue': require('wallaby-vue-compiler')(wallaby.compilers.babel({}))
    }
  }
}

```