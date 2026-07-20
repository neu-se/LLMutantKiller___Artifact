import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate the complex sinh correctly', () => {
    const c = new Complex(0, 0);
    const result = c.sinh();
    if (result.re !== 0 || result.im !== 0) {
      throw new Error('Test failed');
    }
  });
});