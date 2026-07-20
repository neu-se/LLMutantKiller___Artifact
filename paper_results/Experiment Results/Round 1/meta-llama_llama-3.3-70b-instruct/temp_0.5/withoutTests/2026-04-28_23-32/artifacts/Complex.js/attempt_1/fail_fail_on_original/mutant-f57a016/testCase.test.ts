import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly parse complex numbers from strings', () => {
    const c = new Complex('23.1337+3i');
    expect(c.re).toBeCloseTo(23.1337);
    expect(c.im).toBeCloseTo(3);
  });
});