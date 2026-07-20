import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural function", () => {
  it("should return the singular form when num is 1", () => {
    // When num === 1, the original code returns the word unchanged
    // The mutation changes the condition to always true, so it would pluralize even when num === 1
    expect(plural("cat", 1)).toBe("cat")
  })
})