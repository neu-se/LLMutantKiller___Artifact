import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural function", () => {
  it("should return singular form when num is 2 (not 1)", () => {
    // With the original code: `if (num !== 1 || num === undefined)` 
    // When num=2: (2 !== 1) is true, so it pluralizes -> "cats"
    // With the mutated code: `if (false || num === undefined)`
    // When num=2: false || (2 === undefined) = false, so it returns word unchanged -> "cat"
    const result = plural("cat", 2)
    expect(result).toBe("cats")
  })
})