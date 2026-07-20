import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"
import { describe, it, expect } from '@jest/globals'

describe('Matcher optional segment compilation', () => {
  it('should correctly compile optional segments when min=0', () => {
    const matcher = Matcher.for('/**/foo')
    const regex = matcher[Symbol.match]('/foo')
    expect(regex).not.toBeNull()
    expect(regex![0]).toBe('/foo')
  })
})