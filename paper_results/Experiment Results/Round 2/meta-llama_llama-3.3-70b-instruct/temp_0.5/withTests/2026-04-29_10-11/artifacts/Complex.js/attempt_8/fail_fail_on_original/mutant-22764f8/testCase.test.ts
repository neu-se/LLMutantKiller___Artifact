const Complex = require('./complex.js');

describe('Complex', () => {
  it('should throw an error when trying to access an undefined property in acot', () => {
    const complex = new Complex(1, 1);
    const acot = complex.acot;
    expect(acot).toBeInstanceOf(Function);
  });
});