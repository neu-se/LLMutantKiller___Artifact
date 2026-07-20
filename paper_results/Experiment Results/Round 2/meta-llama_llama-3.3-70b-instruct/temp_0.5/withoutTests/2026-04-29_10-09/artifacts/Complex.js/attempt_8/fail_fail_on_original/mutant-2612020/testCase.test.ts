import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should throw an error when trying to access a property that is not "re" or "im"', () => {
    const complex = new Complex('1+2i');
    expect(() => {
      const _ = complex[''];
    }).toThrowError();
  });
});