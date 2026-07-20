import { Rule } from "../../../../../../../../../../../../subject_repositories/spacl-core/src/rule"
import { Matcher } from "../../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Rule.matches', () => {
  it('should return false when context property is undefined even when match group is also undefined', () => {
    // Create a matcher with an optional capture group
    // When path matches but optional group doesn't capture, match[index+1] is undefined
    // ctx[prop] is also undefined
    // Original: prop === undefined → return false (correct)
    // Mutated: false || undefined !== undefined → false → doesn't return false → returns true (bug!)
    const matcher = new Matcher('/path(?:/:id)?')
    const rule = new Rule(matcher)
    rule.allow('read')
    
    const ctx = { id: undefined as unknown as string }
    const result = rule.matches('/path', ctx)
    
    expect(result).toBe(false)
  })
})