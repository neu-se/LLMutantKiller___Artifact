import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule"
import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Rule', () => {
  it('should not match when context property is undefined and capture group is also undefined', () => {
    // Create a Matcher with an optional capture group
    // When path matches but capture group is undefined, and ctx is missing the prop
    // Original: prop===undefined -> return false -> no match
    // Mutated: skips check, undefined !== undefined is false, continues, returns true (match!)
    
    // Need to understand Matcher's props format to create this scenario
    // Let's try with a pre-compiled Matcher that has optional groups
    const matcher = new Matcher(/^\/profile(\/\w+)?$/)
    // Manually set props if needed... but Matcher might not expose that easily
    
    // Alternative: use string spec with optional segment
    const rule = Rule.for('/profile/{section}?') // if this syntax is supported
    rule.allow('read')
    
    const result = rule.query('/profile', 'read', {})
    expect(result).toBeNull()
  })
})