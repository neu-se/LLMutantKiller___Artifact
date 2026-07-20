import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should pluralize 'electronic' to 'electronics'", () => {
    // In original: 'electronics' matches the misc rule and returns unchanged
    // The word 'electronic' pluralized should be 'electronics'
    // In mutated code with empty string, \b\b could match word boundaries
    // causing words ending in 's' to incorrectly match the misc rule
    const result = plural("electronic")
    expect(result).toBe("electronics")
  })
})