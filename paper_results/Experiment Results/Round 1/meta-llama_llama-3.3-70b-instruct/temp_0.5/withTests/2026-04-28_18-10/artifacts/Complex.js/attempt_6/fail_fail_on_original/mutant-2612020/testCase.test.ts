import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly parse a complex number from an object with "re" and "im" properties', () => {
    const complex = new Complex({ re: 1, im: 2 });
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
    // In the mutated code, the line z['re'] = 0; is replaced with z[""] = 0;
    // So, the mutated code should not throw an error when creating a Complex object with an empty property
    expect(() => new Complex({ "": 1, im: 2 })).not.toThrowError();
  });
});