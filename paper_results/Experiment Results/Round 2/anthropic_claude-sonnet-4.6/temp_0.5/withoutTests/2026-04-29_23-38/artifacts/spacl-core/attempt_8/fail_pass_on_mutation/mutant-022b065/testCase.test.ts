import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should handle spec starting with newline followed by valid path ending in slash', () => {
    // A spec like '\n/foo/' - \n at position 0 means:
    // - Character check: ^[...]*$ - [...]* matches 0 chars, $ at pos 0
    //   Last char is '/', not '\n', so $ doesn't match at pos 0. FAILS char check.
    // So this throws 'invalid characters', not 'trailing slash'
    // Original: ^.+\/$ on '\n/foo/' - . doesn't match \n at pos 0. NO MATCH from pos 0.
    // Mutated: .+\/$ on '\n/foo/' - tries from pos 1: .+ matches /foo, \/ matches /. MATCH!
    // BUT this never reaches trailing slash check due to char check failing first.
    // 
    // Unless... the char check passes for '\n/foo/'?
    // ^[a-zA-Z0-9_/:~.$+*-]*$ on '\n/foo/'
    // [...]* matches 0 chars at pos 0 (\n not in set)
    // $ at pos 0: last char is '/', not '\n'. $ doesn't match. FAIL.
    // So char check fails. Both versions throw 'invalid characters'.
    expect(() => new Matcher('\n/foo/')).toThrow('Path contains invalid characters')
  })
})