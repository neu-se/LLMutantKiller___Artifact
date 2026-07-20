import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher', () => {
  it('does not throw trailing slash error for root path /', () => {
    let errorMessage = ''
    try {
      new Matcher('/')
    } catch (e: any) {
      errorMessage = e.message
    }
    expect(errorMessage).not.toBe('Path must not end with a slash')
  })
})