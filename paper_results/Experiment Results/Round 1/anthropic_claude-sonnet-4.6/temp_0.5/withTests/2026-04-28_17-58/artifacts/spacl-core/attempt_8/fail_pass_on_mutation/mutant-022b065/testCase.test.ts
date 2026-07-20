import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher', () => {
  it('rejects paths with trailing slash including those with special valid characters', () => {
    // Test that $ character in path still gets trailing slash detected
    expect(() => Matcher.for('/foo$/bar/')).toThrow('Path must not end with a slash')
    // Valid path with $ should work
    expect(() => Matcher.for('/foo$/bar')).not.toThrow()
    // The root path should always be valid
    expect(() => Matcher.for('/')).not.toThrow()
  })
})