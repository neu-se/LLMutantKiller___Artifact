import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex object parsing with partial properties", () => {
  it("should throw a SyntaxError when an object has 're' but not 'im'", () => {
    // Original: 'im' in a && 're' in a => both must be present
    // Mutated:  'im' in a || 're' in a => only one needs to be present
    // With the mutation, { re: 3 } would match the first branch,
    // setting re=3 and im=undefined (NaN), instead of throwing.
    expect(() => {
      new Complex({ re: 3 } as any);
    }).toThrow(SyntaxError);
  });
});