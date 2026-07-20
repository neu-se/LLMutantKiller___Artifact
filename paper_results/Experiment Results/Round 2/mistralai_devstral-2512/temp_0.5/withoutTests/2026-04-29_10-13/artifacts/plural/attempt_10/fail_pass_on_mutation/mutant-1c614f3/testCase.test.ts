import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly apply function-based exact match rules", () => {
    // This tests the exact match rule for words ending in 'man'
    // which uses a function as the second element in the rule
    expect(plural("woman")).toBe("women");
    expect(plural("man")).toBe("men");
  });
});