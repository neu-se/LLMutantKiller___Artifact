import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly parse a complex number and have "re" and "im" as own enumerable properties', () => {
    const complex = new Complex('1+2i');
    expect(Object.getOwnPropertyNames(complex)).toEqual(['re', 'im']);
  });
});