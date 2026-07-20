import { Complex } from "../complex";

describe('Complex', () => {
  it('should correctly handle log function for complex numbers', () => {
    const complex = new Complex(0, 0);
    const logResult = complex.log();
    expect(logResult.re).toBeNaN();
    expect(logResult.im).toBeNaN();
  });
});