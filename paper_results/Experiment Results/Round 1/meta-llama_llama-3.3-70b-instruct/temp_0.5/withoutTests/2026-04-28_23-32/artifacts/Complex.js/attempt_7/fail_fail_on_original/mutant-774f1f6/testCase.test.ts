import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly parse a complex number when an object with no properties is provided', () => {
    const complex = new Complex({});
    expect(complex.re).toBe(0);
    expect(complex.im).toBe(0);
  });
});