describe('Complex', () => {
  it('should throw an error when sech is called with invalid this[""]', () => {
    const Complex = require('./complex.js');
    const complex = new Complex(1, 0);
    complex.re = undefined;
    expect(() => complex.sech()).toThrowError();
  });
});