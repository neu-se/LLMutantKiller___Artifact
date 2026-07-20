import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher', () => {
  it('version 1 wildcard spec should match correctly', () => {
    // In version 1/1.0, * and + are wildcards
    // Try a spec with * in version 1
    const matcher = new Matcher('/foo/*', '1')
    // /foo/* in v1: * is a single-segment wildcard (min=1, any=true? or min=1,max=1?)
    // Actually in v1, * means min++, any=true (same as 1.1)
    // reversed: ['*', 'foo']
    // '*': min=1, any=true
    // 'foo': flatten(false): any=true, min=1, final=false, opt=true
    //   final&&opt&&min<1 = false (min=1)
    //   Original: else-if(min>0) = true → opt=false
    //   Mutated: else-if(true) → opt=false
    //   Same!
    expect('/foo/bar'.match(matcher)).not.toBeNull()
    expect('/foo'.match(matcher)).toBeNull()
  })
})