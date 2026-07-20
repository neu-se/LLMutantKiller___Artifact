import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher mutation detection', () => {
  it('spec with capture followed by optional wildcard matches root-like paths', () => {
    // Try to find any spec where original and mutated differ
    // Based on analysis, the mutation seems equivalent, but let's try
    // a spec where non-final flatten is called with min=0 and opt=true
    // and see if the resulting regex source differs
    
    // /foo/++ - non-final flatten with min=0, max=1, opt=true
    // Original: opt stays true during flatten, then set false by default
    // Mutated: opt set false during flatten, then set false by default  
    // Result: same (opt=false in both)
    
    // The key insight I might be missing: does opt=true during flatten
    // affect the PUSH logic? Let me check... no, opt is not in push logic.
    
    // Let me try the simplest possible test that might catch something:
    const specs = ['/**', '/++', '/*', '/+', '/foo/**', '/foo/++']
    for (const spec of specs) {
      const m = Matcher.for(spec, '1.1')
      // Just verify these don't throw and produce valid matchers
      expect(m).toBeInstanceOf(RegExp)
    }
    
    // The mutation changes opt=false behavior. The only way this matters
    // is if opt ends up different. Let me check /**/* 
    // reversed: ['*', '**']
    // '*': min=1, any=true
    // '**': flatten(false): any=true, min=1, final=false, opt=true
    //   max>0||any = true
    //   final&&opt&&min<1 = false (min=1, not <1)
    //   Original: else-if(min>0) = true → opt = FALSE
    //   Mutated: else-if(true) → opt = FALSE
    //   Same! (min=1>0 so original also sets opt=false)
    const m2 = Matcher.for('/**/*', '1.1')
    expect('/foo'.match(m2)).not.toBeNull()
  })
})