import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly handle string-based rules with function results", () => {
    // This test targets the specific mutation by adding a custom rule
    // that uses a function as the result, which the mutation would break
    plural.addRule("testword", (w) => w + "s");
    expect(plural("testword")).toBe("testwords");
  });
});