import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"
import { describe, it, expect } from "@jest/globals"

describe('Matcher trailing slash guard', () => {
  it('returns null for trailing slash paths without delegating to exec', () => {
    const matcher = Matcher.for('/foo')
    
    // Override exec to return non-null for trailing slash strings
    // This lets us detect whether the guard is bypassed
    const originalExec = matcher.exec.bind(matcher)
    matcher.exec = (string: string): RegExpExecArray | null => {
      if (string.length > 1 && string.endsWith('/')) {
        return Object.assign([string], { index: 0, input: string }) as RegExpExecArray
      }
      return originalExec(string)
    }
    
    const result = matcher[Symbol.match]('/foo/')
    expect(result).toBeNull()
  })
})