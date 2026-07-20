import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should return the singular form when num is 1", () => {
    // When num === 1, the condition (num !== 1 || ...) is false, so word is returned as-is
    // Both original and mutated should behave the same here
    // But when num is undefined (not passed), pluralization should occur
    // The key test: passing undefined explicitly should pluralize
    // Original: undefined !== 1 (true) || undefined === undefined (true) => true => pluralize
    // Mutated:  undefined !== 1 (true) || false => true => pluralize
    // These are equivalent, so let's test the num=1 case to ensure singular is returned
    expect(plural("cat", 1)).toBe("cat")
    // And without num, should pluralize
    expect(plural("cat")).toBe("cats")
    // With num=2, should pluralize
    expect(plural("cat", 2)).toBe("cats")
  })
})