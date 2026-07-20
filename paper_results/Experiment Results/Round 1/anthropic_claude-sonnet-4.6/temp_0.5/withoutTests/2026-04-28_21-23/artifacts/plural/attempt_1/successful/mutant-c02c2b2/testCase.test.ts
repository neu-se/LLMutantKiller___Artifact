import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural function", () => {
  it("should return plural form when num is 2 (not 1)", () => {
    // When num !== 1, the function should pluralize the word
    // Original: if (num !== 1 || num === undefined) -> pluralize
    // Mutated: if (num === 1 || num === undefined) -> pluralize when num IS 1
    
    // With num=2, original code enters the pluralization block (2 !== 1 is true)
    // With num=2, mutated code does NOT enter the block (2 === 1 is false, 2 === undefined is false)
    // so mutated code returns "cat" instead of "cats"
    expect(plural("cat", 2)).toBe("cats")
  })
})