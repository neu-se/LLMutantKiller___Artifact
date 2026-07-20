import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly handle string-based rules without calling them as functions", () => {
    // This test targets the mutation by using a rule where rule[1] is a string
    // The mutation changes the condition from checking if rule[1] is a Function to always true
    // This will cause it to try to call a string as a function, which should fail
    expect(plural("bacterium")).toBe("bacteria");
    expect(plural("criterion")).toBe("criteria");
    expect(plural("memo")).toBe("memos");
    expect(plural("cello")).toBe("cellos");
  });
});