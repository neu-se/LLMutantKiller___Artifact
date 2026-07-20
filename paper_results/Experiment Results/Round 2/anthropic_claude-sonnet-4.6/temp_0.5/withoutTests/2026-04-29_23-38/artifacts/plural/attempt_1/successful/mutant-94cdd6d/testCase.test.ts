import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural function with num === 1", () => {
  it("should return the singular form when num is 1", () => {
    // When num === 1, the original code should return the word unchanged (singular)
    // The original condition: if (num !== 1 || num === undefined)
    // - When num === 1: false || false = false, so we skip pluralization and return word
    // The mutated condition: if (num !== 1 || num !== undefined)
    // - When num === 1: false || true = true, so we enter pluralization block
    expect(plural("cat", 1)).toBe("cat")
  })
})