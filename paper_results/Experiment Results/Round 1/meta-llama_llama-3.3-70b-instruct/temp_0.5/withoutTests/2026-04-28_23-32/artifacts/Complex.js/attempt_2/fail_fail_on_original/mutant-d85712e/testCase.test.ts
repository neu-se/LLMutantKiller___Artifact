import { Complex } from "../../../complex.js";

describe('Complex', () => {
  it('should correctly parse complex numbers from strings', () => {
    const complex = new Complex('1+Stryker was here!i');
    expect(complex.re).toBe(1);
    expect(complex.im).toBeNaN();
  });
});