import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should floor complex number correctly', () => {
    const complex = new Complex(12.3456, 7.89);
    const floored = complex.floor(2);
    expect(floored.re).toBeCloseTo(12.34);
    expect(floored.im).toBeCloseTo(7.89);

    // Test with a valid input
    expect(complex.floor(3).re).toBeCloseTo(12.346);
    expect(complex.floor(3).im).toBeCloseTo(7.890);

    // The mutated code will cause an error when passing a boolean to the floor function
    // So we expect the test to pass when the input is a number, but fail when it's not
    expect(() => complex.floor('a')).toThrowError();
  });
});