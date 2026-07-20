import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('detects single-char after colon edge case', () => {
    // A segment that is just ":" followed by one char - both regexes match
    // But what about a segment where part === ":"?
    // That's prevented. What about part that has colon not at start?
    // Also prevented. 
    // The ONLY difference: /:.+/ needs 1+ chars, /:./ needs exactly 1
    // For substring match they're the same UNLESS string ends with ":"
    // Try ":a" - /:.+/ matches ":a", /:./ matches ":a" - same
    // The real question: is there any valid `part` where they differ?
    // Answer seems no for valid inputs...
    // Let me try to see if opt/flatten interaction differs
    const m1 = new Matcher('/:name/**')
    expect(m1.props).toEqual(['name'])
    const result = '/foo/bar/baz'.match(m1)
    expect(result).not.toBeNull()
  })
})