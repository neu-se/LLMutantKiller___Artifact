import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher', () => {
  it('correctly compiles capture segment with dollar sign name', () => {
    // ':$' - colon followed by '$' which is in valid charset
    // Both /:.+/ and /:./  match ':$' -> treated as capture
    // props should contain '$'
    const matcher = Matcher.for('/:$')
    expect(matcher.props).toEqual(['$'])
    const result = '/hello'.match(matcher)
    expect(result).not.toBeNull()
    expect(result![1]).toBe('hello')
  })
})