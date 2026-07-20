import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate csch for a complex number', () => {
    const complex = new Complex(1, 2);
    expect(complex["im"]).toBe(2);
    const csch = complex.csch();
    expect(complex["im"]).toBe(2);
  });
});