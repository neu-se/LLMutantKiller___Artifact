import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should have a specific number of own enumerable properties when parsing a complex number', () => {
    const complex = new Complex('1+2i');
    expect(Object.keys(complex)).toHaveLength(2);
  });
});