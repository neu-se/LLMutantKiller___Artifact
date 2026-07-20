import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should return singular form when num is 1", () => {
    // With original code: num !== 1 is false when num === 1, so it returns word
    // With mutated code: false || num === undefined is false when num === 1 (not undefined),
    // so it would fall through to return word + 's' instead of word
    expect(plural("cat", 1)).toBe("cat")
  })
})