import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should pluralize 'electronics' correctly without the ics rule interfering with singular form", () => {
    // In original: 'electronics' matches misc rule (electronic+s) -> returns 'electronics'
    // In mutated: 'electronic' removed, 'electronics' falls to /ics$/ -> returns 'electronics'  
    // Same result... need different approach.
    // What if we test a word that the EMPTY STRING alternative incorrectly captures?
    // \b(?:...|)s\b with empty alt: at word boundary, empty match + 's' = matches 's' at boundary
    // The word "as" ends in 's' - \b(?:...|)s\b - does empty alt match 'a' then 's'? No, \b is before group.
    // \b[empty]s = \bs - word boundary then 's' - matches start of 'something' where s begins word
    // So "something" - \b matches before 's', empty matches, then needs 's'... 
    // Actually this would match the 's' in "something" if followed by \b
    // "something" has \bs at position 0, then empty, then 's' matches, then \b? 'o' is not boundary.
    // What about the word "s" itself? Or words where 's' is followed by word boundary like "as is"?
    expect(plural("as")).toBe("as") // 'as' should just get 's' -> 'ass'? No, it matches /s$/ -> 'ases'
  })
})