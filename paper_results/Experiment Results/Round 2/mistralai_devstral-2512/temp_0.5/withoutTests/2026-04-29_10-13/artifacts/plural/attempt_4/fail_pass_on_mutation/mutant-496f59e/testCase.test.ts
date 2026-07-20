import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly handle string-based rules without calling them as functions", () => {
    // This test targets the mutation by using a rule where rule[1] is a string
    // The mutation changes the condition from checking if rule[1] is a Function to always true
    // This will cause it to try to call a string as a function, which should fail
    const result = plural("bacterium");
    expect(result).toBe("bacteria");
  });
});