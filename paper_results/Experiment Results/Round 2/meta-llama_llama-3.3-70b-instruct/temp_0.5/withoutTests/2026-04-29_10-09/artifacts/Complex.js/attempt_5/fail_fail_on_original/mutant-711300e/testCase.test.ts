import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when parsing an object with only "re" property', () => {
    expect(() => new Complex({ re: 1 })).toThrow();
  });
});