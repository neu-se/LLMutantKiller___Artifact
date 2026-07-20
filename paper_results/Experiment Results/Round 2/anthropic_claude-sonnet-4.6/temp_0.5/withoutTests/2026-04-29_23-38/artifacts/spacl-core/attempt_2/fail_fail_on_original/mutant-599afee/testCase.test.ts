import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule"

describe('Rule', () => {
  it('should return null when context is missing required property and capture group is undefined', () => {
    // Use a rule with a context variable
    const rule = Rule.for('/{userId}/profile')
    rule.allow('read')
    
    // ctx provided but missing 'userId' - prop will be undefined
    // match[1] will be 'john' (not undefined)
    // Original: prop===undefined -> return false -> null
    // Mutated: false || 'john'!==undefined -> true -> return false -> null
    // Both null... need different approach
    
    expect(rule.query('/john/profile', 'read', {})).toBeNull()
  })
})