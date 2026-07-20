import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should not parse an empty string as a valid complex number', () => {
    const complex = new Complex('');
    expect(complex.im).not.toBe(1);
  });
});