import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should return plural form when num is 2", () => {
    // Original: num !== 1 is true when num === 2, so it pluralizes
    // Mutated: false || (2 === undefined) is false, so it returns word unchanged
    expect(plural("cat", 2)).toBe("cats")
  })
})