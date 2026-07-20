import Complex from './complex.js';

describe('Complex', () => {
  it('should throw an error when trying to access an undefined property in acot', () => {
    const complex = new Complex(1, 1);
    const originalRe = complex.re;
    const originalCode = `
      var a = this['re'];
    `;
    const mutatedCode = `
      var a = this[""];
    `;
    expect(originalRe).not.toBeUndefined();
    expect(() => eval(mutatedCode)).toThrowError();
  });
});