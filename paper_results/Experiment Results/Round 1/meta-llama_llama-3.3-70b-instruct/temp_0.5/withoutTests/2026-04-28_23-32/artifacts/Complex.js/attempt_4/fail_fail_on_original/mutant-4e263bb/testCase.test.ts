import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should not be able to access undefined property', () => {
    const complex = new Complex(1, 2);
    expect(() => complex.acoth()).not.toThrowError();
    expect(complex["re"]).toBeDefined();
    expect(complex[""]).toBeUndefined();
  });
});