import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher constructor', () => {
  it('throws an error with the message "Path must begin with a slash" when spec does not start with a slash', () => {
    expect(() => new Matcher('foo')).toThrow('Path must begin with a slash')
  })
})