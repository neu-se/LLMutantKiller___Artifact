import { describe, it, expect } from '@jest/globals'
import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('new Matcher without version rejects specs invalid in all versions', () => {
    expect(() => new Matcher('/foo/')).toThrow('Path must not end with a slash')
    expect(() => new Matcher('foo')).toThrow('Path must begin with a slash')
    expect(() => new Matcher('/foo//bar')).toThrow('Path contains empty segments')
  })
})