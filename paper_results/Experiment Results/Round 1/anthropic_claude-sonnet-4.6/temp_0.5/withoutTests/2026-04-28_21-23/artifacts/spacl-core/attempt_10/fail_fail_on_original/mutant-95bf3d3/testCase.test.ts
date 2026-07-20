import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher', () => {
  it('source check for spec that exercises the mutation boundary', () => {
    const m = new Matcher('/foo/**')
    // If opt=true: source starts with ^/$|^
    // If opt=false: source starts with ^
    // The mutation sets opt=false when min=0 in non-final flatten
    // but default case also sets opt=false, so both should give same result
    expect(m.source).toBe('^/foo(?:/[^/]+)*$')
  })
})