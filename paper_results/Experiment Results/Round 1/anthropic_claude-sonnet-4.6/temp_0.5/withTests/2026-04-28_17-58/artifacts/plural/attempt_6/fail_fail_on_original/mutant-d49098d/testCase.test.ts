import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural - words not affected by misc singular-plural rule", () => {
  it("should pluralize 'cats' correctly without being caught by empty string in regex", () => {
    // In mutated code, empty string creates \b(?:...|)s\b which matches standalone 's'
    // but more importantly tests word boundary behavior
    expect(plural("cats")).toBe("catss");
  });
});