import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex parse NaN detection", () => {
  it("should produce NaN complex when only imaginary part is NaN", () => {
    // Original: isNaN(re) || isNaN(im) - if re is valid but im is NaN, condition is true
    // Mutated:  isNaN(re) && isNaN(im) - if re is valid but im is NaN, condition is false, no NaN handling
    // With a string parse that results in only im being NaN, we can detect the difference
    // When parsing a number, re=5, im=0 - both valid, no difference
    // Key: construct via two-arg form where b is NaN
    const c = new Complex(5, NaN);
    // Original: isNaN(5) || isNaN(NaN) = false || true = true → parser_exit (throws)
    // Mutated:  isNaN(5) && isNaN(NaN) = false && true = false → no throw, c.im = NaN
    // So original throws, mutated doesn't
    expect(c.isNaN()).toBe(true);
  });
});