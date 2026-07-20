import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher', () => {
  it('Matcher for /foo/++ has correct source without ^/$ prefix', () => {
    const m = new Matcher('/foo/++')
    // /foo/++ has a literal 'foo' which triggers flatten() non-finally
    // with max=1, min=0 accumulated from '++'
    // In original: min>0 is false, opt stays true (but then default sets opt=false)
    // In mutated: min>=0 is true, opt=false (but default also sets opt=false)
    // Both should produce opt=false, so no ^/$ prefix
    expect(m.source).not.toContain('^/$')
  })
})