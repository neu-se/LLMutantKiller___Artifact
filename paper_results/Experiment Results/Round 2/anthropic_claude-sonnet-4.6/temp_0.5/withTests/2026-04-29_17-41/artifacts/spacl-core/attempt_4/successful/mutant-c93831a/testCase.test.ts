import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"
import { describe, it, expect, jest } from "@jest/globals"

describe('Matcher [Symbol.match] guard', () => {
  it('checks if string ends with slash before delegating to super', () => {
    const matcher = Matcher.for('/foo')
    const spy = jest.spyOn(String.prototype, 'endsWith')
    
    matcher[Symbol.match]('/foo/')
    
    expect(spy).toHaveBeenCalledWith('/')
    spy.mockRestore()
  })
})