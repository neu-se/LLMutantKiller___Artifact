import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"
import { describe, it, expect } from '@jest/globals'

describe('Matcher optional segment compilation', () => {
  it('should correctly compile patterns with optional segments when min=0 and opt=true', () => {
    const matcher = Matcher.for('/++')
    const regex = matcher[Symbol.match]('/')
    expect(regex).not.toBeNull()
    expect(regex![0]).toBe('/')
  })
})