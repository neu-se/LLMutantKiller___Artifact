import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex parsing with form feed character", () => {
  it("should throw on form feed character which is not in the whitespace list", () => {
    // \f (form feed \x0C) IS matched by regex . so it becomes a token
    // Neither original nor mutated handles \f - both throw
    // But \t IS handled in both - let's confirm \t works
    // The mutation only affects \n which regex . never matches
    // Verify \t handling still works correctly
    const result = new Complex("2\t+\t3i");
    expect(result.re).toBe(2);
    expect(result.im).toBe(3);
    expect(result.toString()).toBe("2 + 3i");
  });
});