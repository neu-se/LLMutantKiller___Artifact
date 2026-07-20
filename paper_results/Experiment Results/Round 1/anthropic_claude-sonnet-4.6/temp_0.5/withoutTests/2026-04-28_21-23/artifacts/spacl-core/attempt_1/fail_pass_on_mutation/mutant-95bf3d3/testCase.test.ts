import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should match root path for spec /foo/** with opt behavior', () => {
    const m = new Matcher('/foo/**')
    // With original code, opt remains true allowing certain matches
    // With mutated code, opt is incorrectly set to false
    expect('/foo'.match(m)).not.toBeNull()
  })
})