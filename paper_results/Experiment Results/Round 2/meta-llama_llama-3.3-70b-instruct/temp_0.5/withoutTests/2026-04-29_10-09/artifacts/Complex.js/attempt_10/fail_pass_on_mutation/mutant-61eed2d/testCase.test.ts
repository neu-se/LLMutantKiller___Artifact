import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly parse a complex number and have "re" andim as own enumerable properties with the correct values', () => {
    const complex = new Complex('1+2i');
    expect(Object.keys(complex)).toEqual(['re', 'im']);
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
    expect(Object.keys(complex).sort()).toEqual(['im', 're'].sort());
  });
});