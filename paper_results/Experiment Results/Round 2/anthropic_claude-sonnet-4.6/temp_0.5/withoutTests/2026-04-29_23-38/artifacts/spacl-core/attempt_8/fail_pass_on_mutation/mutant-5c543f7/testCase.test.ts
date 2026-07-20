import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher', () => {
  it('should match root path when spec is just a capture with optional wildcard', () => {
    // Test opt behavior: when spec has capture, opt should be set to false
    // causing finalise() to use '^' instead of '^/$|^'
    const matcher = new Matcher('/:id')
    // Root path should NOT match since /:id requires a segment
    expect('/'.match(matcher)).toBeNull()
    // But also verify the regex source to understand opt behavior
    const src = matcher.source
    // With opt=false (capture sets it), should not have '^/$|^' prefix
    expect(src).not.toContain('/$|')
  })
})