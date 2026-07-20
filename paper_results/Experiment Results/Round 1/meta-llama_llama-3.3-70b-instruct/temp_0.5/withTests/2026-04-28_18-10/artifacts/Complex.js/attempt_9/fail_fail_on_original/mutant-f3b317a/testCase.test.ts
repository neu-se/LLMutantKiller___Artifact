import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return a result when asec is called with a value that does not cause division by zero', () => {
    const complex = new Complex(1, 0);
    const result = complex.asec();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(result.re).not.toBeUndefined();
    expect(result.im).not.toBeUndefined();
  });
});