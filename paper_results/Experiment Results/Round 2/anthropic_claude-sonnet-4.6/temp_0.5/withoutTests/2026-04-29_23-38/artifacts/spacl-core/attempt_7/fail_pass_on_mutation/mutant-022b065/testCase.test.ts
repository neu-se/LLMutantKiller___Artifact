import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should not throw trailing slash error for spec ending with newline', () => {
    // /\n passes character check ($ matches before trailing \n, / is valid)
    // /\n does NOT end with / so should not trigger trailing slash error
    // Original ^.+\/$ on /\n: .+ matches /, \/ needs / at pos 1 which is \n. FAIL.
    // Mutated .+\/$ on /\n: same. FAIL.
    // Both same... 
    
    // What about a spec where the mutated regex matches differently?
    // I need position 0 to have \n, but that fails char check...
    
    // Let me try the only case where $ behavior differs: string ending with \n
    // where the / comes just before \n
    const spec = '/\n'
    // This passes char check! / is valid, $ matches before \n
    // Does it start with /? Yes.
    // Does it have //? No.
    // Trailing slash check: /\n - is there a / before $?
    // pos 0 = /, pos 1 = \n. $ matches at pos 1 (before \n).
    // ^.+\/$ : .+ matches /, \/ needs / at pos 1 = \n. FAIL.
    // .+\/$ : same. FAIL.
    // Neither throws. Both same.
    expect(() => new Matcher('/\n')).not.toThrow('Path must not end with a slash')
  })
})