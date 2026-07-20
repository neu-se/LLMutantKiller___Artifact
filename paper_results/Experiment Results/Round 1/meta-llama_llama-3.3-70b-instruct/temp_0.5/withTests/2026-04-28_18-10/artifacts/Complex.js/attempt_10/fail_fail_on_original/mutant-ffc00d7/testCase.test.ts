const fs = require('fs');
const path = require('path');

const complexCode = `
(function(root) {
  'use strict';

  // ... rest of the complex.js code ...

  root.Complex = Complex;
})(this);
`;

const Complex = eval(complexCode).Complex;

describe('Complex', () => {
  it('should throw an error when parsing an empty string', () => {
    expect(() => new Complex('')).toThrowError();
  });
});