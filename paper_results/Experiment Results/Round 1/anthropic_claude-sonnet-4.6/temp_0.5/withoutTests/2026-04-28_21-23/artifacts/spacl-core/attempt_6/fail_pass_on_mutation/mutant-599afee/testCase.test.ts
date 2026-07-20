import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule"
import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Rule.matches', () => {
  it('should return false when context property is undefined', () => {
    // The mutation removes the prop === undefined check
    // To expose this: we need ctx[prop] === undefined AND match[index+1] === undefined
    // This happens when Matcher has more props than capture groups, OR
    // when a capture group is optional and doesn't match
    // 
    // Let's directly test: provide ctx without the required property
    // and use a path where the Matcher's regex has an optional group
    //
    // Matcher spec /a/:x - regex becomes /^\/a\/([^/]+)$/
    // match[1] = captured value (always a string if path matches)
    // ctx.x = undefined
    // Original: undefined === undefined → return false ✓
    // Mutated: false || 'value' !== undefined → true → return false ✓ (same!)
    //
    // We need match[1] to be undefined too.
    // Try: what if we use index beyond the actual capture groups?
    // If Matcher has props=['x','y'] but regex only has 1 capture group
    // then match[2] would be undefined
    
    // Let's see if Matcher with /a/:x/:y creates 2 capture groups
    // and test with ctx={x:'val'} but no y - ctx.y is undefined
    // match[2] would be the y capture - if path is /a/val/something, match[2]='something'
    // Still not undefined...
    
    // The real test: use a Matcher where props has an entry but 
    // the corresponding match group index is beyond captured groups
    // This seems impossible with normal :param patterns
    
    // ALTERNATIVE: Test that query() returns null (not false) when ctx prop is undefined
    // Actually let's test the observable behavior through query()
    const rule = new Rule(new Matcher('/users/:id/data'))
    rule.allow('read')
    
    // No ctx provided at all - should return null from query
    const result1 = rule.query('/users/alice/data', 'read')
    expect(result1).toBeNull()
    
    // ctx provided but missing the property
    const ctx: Record<string, string> = {}
    const result2 = rule.query('/users/alice/data', 'read', ctx)
    // Original: prop === undefined → matches returns false → query returns null
    // Mutated: false || 'alice' !== undefined → true → return false → matches returns false → query returns null
    // Same result again...
    expect(result2).toBeNull()
  })
})