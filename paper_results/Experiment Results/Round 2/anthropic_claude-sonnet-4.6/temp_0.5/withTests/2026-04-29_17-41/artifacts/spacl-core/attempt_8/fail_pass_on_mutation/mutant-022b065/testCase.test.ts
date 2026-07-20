import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher', () => {
  it('accepts root path and rejects trailing slash paths correctly', () => {
    expect(() => new Matcher('/')).not.toThrow()
    expect(() => new Matcher('/foo/')).toThrow('Path must not end with a slash')
  })
})