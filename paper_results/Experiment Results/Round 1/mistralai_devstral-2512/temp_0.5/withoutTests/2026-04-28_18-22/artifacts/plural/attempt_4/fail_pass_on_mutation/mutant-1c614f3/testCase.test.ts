import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly handle string-based rules by calling the function", () => {
    // This test specifically targets the mutation by ensuring string-based rules
    // are processed correctly through function calls
    const result = plural("criterion");
    expect(result).toBe("criteria");
  });
});