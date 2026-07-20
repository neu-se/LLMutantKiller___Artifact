import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule"
import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Rule.matches', () => {
  it('should return false when context property is undefined even when match group is also undefined', () => {
    // With an optional capture group, match[index+1] can be undefined
    // If ctx[prop] is also undefined:
    // Original: prop === undefined → return false
    // Mutated: false || undefined !== undefined → false → continues → returns true
    const matcher = new Matcher('/path(?:/:id)?')
    const rule = new Rule(matcher)
    rule.allow('read')
    
    const ctx = { id: undefined as unknown as string }
    const result = rule.matches('/path', ctx)
    
    expect(result).toBe(false)
  })
})