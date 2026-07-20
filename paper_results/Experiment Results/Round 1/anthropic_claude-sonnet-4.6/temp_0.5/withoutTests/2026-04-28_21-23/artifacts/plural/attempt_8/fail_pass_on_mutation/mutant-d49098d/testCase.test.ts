import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should return 'electronics' unchanged when used as input", () => {
    // 'electronics' matches the misc regex in original (electronic + s)
    // In mutated, 'electronic' is replaced by empty string
    // The empty string alternation \b(?:)s\b - does it match 'electronics'?
    // At position before last 's' in 'electronics' there's no word boundary
    // So 'electronics' won't match the misc rule in mutated code
    // It then falls to /ics$/ rule... but what about 'electronicss'?
    // Actually test that 'electronic' pluralizes to 'electronics' not 'electronicses'
    expect(plural("electronic")).toBe("electronics")
  })
})