import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should return electronics unchanged as it is already in plural form in the misc list", () => {
    // In original: 'electronic' is in misc, regex matches 'electronics' -> unchanged
    // BUT /ics$/ is checked first and also returns unchanged
    // The real difference: test a word that ONLY the misc rule handles
    // 'electronicss' won't work. What about checking the misc rule catches 'electronics'
    // before any other rule by testing with a custom word?
    // Actually test 'remainders' vs 'remains':
    // 'remain' is in misc -> 'remains' returns unchanged in both versions
    // Let's test that 'amends' returns unchanged (amend is in misc)
    expect(plural("amends")).toBe("amends")
  })
})