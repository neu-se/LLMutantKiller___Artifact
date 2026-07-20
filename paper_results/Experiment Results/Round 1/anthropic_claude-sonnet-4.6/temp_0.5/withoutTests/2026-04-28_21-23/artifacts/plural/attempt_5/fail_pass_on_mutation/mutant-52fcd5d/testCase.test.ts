import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should pluralize words ending in 's' correctly when the empty string is in misc", () => {
    // In mutated code, empty string in misc creates regex that matches 's' as a word
    // Testing a word that ends in a consonant + s which should get 'es' appended
    // but in mutated code the misc regex with empty string matches it first
    expect(plural("bus")).toBe("buses")
  })
})