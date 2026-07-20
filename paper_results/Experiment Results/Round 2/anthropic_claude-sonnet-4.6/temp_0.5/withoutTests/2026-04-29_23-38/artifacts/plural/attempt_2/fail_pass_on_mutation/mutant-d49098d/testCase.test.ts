import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should pluralize 'gas' to 'gases' without being incorrectly matched by the misc pattern", () => {
    // In the mutated code, "" replaces 'electronic' in the misc array.
    // The resulting regex \b(?:...|)s\b has an empty alternative that matches
    // any word ending in 's' at a word boundary, including 'gas'.
    // This causes 'gas' to match the misc rule and return 'gas' unchanged,
    // instead of correctly pluralizing to 'gases'.
    expect(plural("gas")).toBe("gases")
  })
})