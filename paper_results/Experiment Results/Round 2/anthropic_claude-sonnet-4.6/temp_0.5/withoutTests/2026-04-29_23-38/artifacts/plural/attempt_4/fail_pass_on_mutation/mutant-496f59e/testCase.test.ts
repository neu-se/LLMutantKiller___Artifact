import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural", () => {
  it("should not throw when pluralizing and should return correct plural for goose", () => {
    // 'goose' has string rule: addRule('goose', 'geese')
    // With mutation, first rule's rule[1] is called as function - if it's a string, TypeError
    expect(() => plural("goose", 2)).not.toThrow();
    expect(plural("goose", 2)).toBe("geese");
  });
});