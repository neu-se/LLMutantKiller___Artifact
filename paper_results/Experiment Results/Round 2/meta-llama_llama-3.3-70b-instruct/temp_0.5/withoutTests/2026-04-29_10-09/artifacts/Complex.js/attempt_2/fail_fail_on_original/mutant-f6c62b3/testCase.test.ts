import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should have a defined __esModule property', () => {
    const complex = new Complex();
    expect(Object.keys(complex)).not.toContain('');
  });
});