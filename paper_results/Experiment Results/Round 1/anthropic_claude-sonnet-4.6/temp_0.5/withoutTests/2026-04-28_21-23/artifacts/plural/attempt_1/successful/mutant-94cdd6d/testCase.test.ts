import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural function with num === 1", () => {
  it("should return the singular word unchanged when num is 1", () => {
    // When num === 1, the function should return the word as-is (singular)
    // Original: if (num !== 1 || num === undefined) -> when num is 1, condition is false, returns word
    // Mutated: if (num !== 1 || num !== undefined) -> when num is 1, (false || true) = true, pluralizes
    const result = plural("cat", 1)
    expect(result).toBe("cat")
  })
})