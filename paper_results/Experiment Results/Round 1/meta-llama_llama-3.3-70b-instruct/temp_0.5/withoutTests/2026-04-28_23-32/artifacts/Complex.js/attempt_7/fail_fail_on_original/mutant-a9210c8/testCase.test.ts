import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when trying to access a non-existent property of the sech result', () => {
    const complex = new Complex(1, 2);
    const sech = complex.sech();
    expect(() => sech[""]).toThrow();
  });
});