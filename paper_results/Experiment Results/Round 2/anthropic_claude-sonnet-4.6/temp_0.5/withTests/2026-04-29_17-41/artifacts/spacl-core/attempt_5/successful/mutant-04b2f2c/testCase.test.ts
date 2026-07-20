import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"
import { describe, it, expect, jest } from "@jest/globals"

describe('Matcher [Symbol.match] guard', () => {
  it('does not call through to RegExp match for trailing slash strings', () => {
    const matcher = Matcher.for('/foo')
    const execSpy = jest.spyOn(matcher, 'exec')
    matcher[Symbol.match]('/foo/')
    expect(execSpy).not.toHaveBeenCalled()
  })
})