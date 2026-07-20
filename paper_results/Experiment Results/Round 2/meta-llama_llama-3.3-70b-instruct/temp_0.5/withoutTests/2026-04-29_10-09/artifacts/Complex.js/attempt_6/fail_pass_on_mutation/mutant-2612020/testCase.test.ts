import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should not have any unexpected properties', () => {
    const complex = new Complex('1+2i');
    expect(Object.keys(complex)).toEqual(['re', 'im']);
  });
});