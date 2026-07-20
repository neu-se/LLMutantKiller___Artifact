import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when floor is called with a non-numeric value', () => {
    const complex = new Complex(12.3456, 7.8901);
    expect(() => complex.floor('a')).toThrowError();
  });
});