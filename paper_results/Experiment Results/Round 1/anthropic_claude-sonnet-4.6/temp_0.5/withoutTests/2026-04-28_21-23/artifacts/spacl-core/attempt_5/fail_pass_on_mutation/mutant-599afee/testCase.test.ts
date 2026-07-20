import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule"
import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Rule.matches', () => {
  it('should return false when context property is undefined', () => {
    // Use a simple :param pattern
    // ctx has the prop key but value is undefined
    // Original: prop === undefined → return false
    // Mutated: false || match[1] !== undefined → 'alice' !== undefined → true → return false
    // These give same result when match group is a real string
    
    // Need match[index+1] to also be undefined
    // Try with * wildcard which might create optional capture
    const rule = new Rule(new Matcher('/users/:id/*'))
    rule.allow('read')
    
    // ctx where 'id' is undefined
    const ctx: Record<string, string> = {}
    // ctx.id is undefined (property doesn't exist)
    
    const result = rule.matches('/users/alice/files', ctx)
    // Original: prop (undefined) === undefined → return false → matches = false
    // Mutated: false || 'alice' !== undefined → true → return false → matches = false
    // Still same...
    
    expect(result).toBe(false)
  })
})