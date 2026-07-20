import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural function", () => {
  it("should return plural form when num is 2 (not 1)", () => {
    // When num !== 1, the function should pluralize the word
    // Original: if (num !== 1 || num === undefined) -> enters the pluralization block when num=2
    // Mutated: if (num === 1 || num === undefined) -> does NOT enter the pluralization block when num=2
    const result = plural("cat", 2)
    expect(result).toBe("cats")
  })
})