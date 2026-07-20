import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural", () => {
  it("should correctly pluralize words that match string rules like 'criterion'", () => {
    // The mutation causes the first rule in the array to always be returned
    // without checking if it matches. Since rules are stored with unshift,
    // the last added rule is first. The uncountable rule is last added before
    // the string rules, so with mutation, every word would match the first rule.
    // With original code, 'criterion' should return 'criteria'
    expect(plural("criterion", 2)).toBe("criteria");
    // With original code, 'person' should return 'people'  
    expect(plural("person", 2)).toBe("people");
    // With original code, a regular word should get 's'
    expect(plural("cat", 2)).toBe("cats");
  });
});