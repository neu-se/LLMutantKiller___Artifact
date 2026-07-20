const fs = require('fs');
const vm = require('vm');

describe('Complex', () => {
  it('should throw an error when trying to access the __esModule property of Complex', () => {
    const code = `
      const Complex = {};
      Object.defineProperty(Complex, "", { 'value': true });
    `;
    const context = {};
    expect(() => vm.runInNewContext(code, context)).not.toThrow();
    expect(() => {
      const complexCode = `
        const Complex = context.Complex;
        console.log(Complex.__esModule);
      `;
      vm.runInNewContext(complexCode, { context });
    }).toThrow(TypeError);
  });
});