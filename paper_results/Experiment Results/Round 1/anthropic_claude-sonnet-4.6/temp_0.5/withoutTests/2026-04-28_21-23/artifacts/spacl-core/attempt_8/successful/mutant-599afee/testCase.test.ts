import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule"
import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Rule.matches', () => {
  it('should return false when context property is undefined', () => {
    // Based on the Matcher source seen in error: it validates chars and starts with /
    // :param creates capture groups, props stores param names
    // For mutation detection, we need match[index+1] === undefined
    // 
    // Try: create a Matcher where props=['x'] but regex source makes group optional
    // We can't do this through the string API
    //
    // Alternative: subclass Matcher to inject props
    class TestMatcher extends Matcher {
      constructor() {
        super('/resource/test')
        // Override props to add an extra entry beyond capture groups
        Object.defineProperty(this, 'props', { value: ['missingProp'], writable: false })
      }
    }
    
    const rule = new Rule(new TestMatcher())
    rule.allow('read')
    
    const ctx: Record<string, string> = {}
    // ctx.missingProp is undefined, and match[1] is undefined (no capture group in /resource/test)
    
    const result = rule.matches('/resource/test', ctx)
    // Original: prop===undefined → return false → result=false ✓
    // Mutated: false || undefined!==undefined → false → continue → return true ✗
    
    expect(result).toBe(false)
  })
})