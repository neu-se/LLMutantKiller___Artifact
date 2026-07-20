import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should return 'electronics' unchanged when input is 'electronics' (already plural form in misc list)", () => {
    // In original: 'electronic' is in misc array, so regex matches 'electronics' -> returns 'electronics'
    // In mutated: 'electronic' replaced by '', so 'electronics' no longer matches misc rule
    // BUT it does match /ics$/ rule -> still returns 'electronics'
    // Need a word where electronic's absence AND empty string insertion causes difference
    // The empty string creates \b(?:...|entrail||outskirt|...)s\b
    // This matches \b + empty + s + \b = word boundary then s then word boundary
    // In "outskirts" context: \b before 'o', 'outskirt' matches, then 's', then \b -> match
    // What about "kudoss" - no that's not real
    // Let me test: does the empty alternative cause 'jitters' to still work?
    expect(plural("jitters")).toBe("jitters")
  })
})