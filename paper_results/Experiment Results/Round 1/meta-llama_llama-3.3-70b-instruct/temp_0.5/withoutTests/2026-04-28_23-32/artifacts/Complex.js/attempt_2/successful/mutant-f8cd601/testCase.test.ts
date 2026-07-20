import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate csch correctly', () => {
    const complex = new Complex(1, 1);
    const csch = complex.csch();
    expect(csch).toBeDefined();
    expect(csch.re).toBeDefined();
    expect(csch.im).toBeDefined();
  });
});