import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural basic pluralization", () => {
  it("should add 's' to a word with no special rule", () => {
    expect(plural("test")).toBe("tests");
  });
});