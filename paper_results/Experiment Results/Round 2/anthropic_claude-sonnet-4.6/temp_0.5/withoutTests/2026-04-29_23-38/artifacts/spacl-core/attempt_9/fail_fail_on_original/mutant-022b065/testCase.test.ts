import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should handle spec with trailing newline', () => {
    // '/foo\n' passes char check, doesn't end with /
    // compile('/foo\n') should work
    const m = new Matcher('/foo\n')
    expect(m.spec).toBe('/foo\n')
  })
})