import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher trailing slash validation', () => {
  it('correctly validates the root path spec', () => {
    // The root path "/" must be accepted - it does not end with a slash in the
    // sense that there is content before the trailing slash
    // With original regex /^.+\/$/, "/" does not match (. matches /, but then needs another /)
    // With mutated regex /.+\/$/, same behavior
    // The real difference: a spec where ^ matters
    // Since all valid specs start with /, and . matches /, the ^ anchor
    // only matters if the first char wouldn't be matched by . - impossible here
    // So let's verify the boundary: specs ending with / are rejected
    expect(() => new Matcher('/+')).not.toThrow()
    expect(() => new Matcher('/+/')).toThrow('Path must not end with a slash')
  })
})