import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should not throw for spec with newline at start that passes char check', () => {
    // A spec starting with \n where \n is the "final newline" trick
    const spec = '\n/foo'
    // This should throw "invalid characters" or "must begin with slash"
    // not "must not end with slash"
    expect(() => new Matcher(spec)).not.toThrow('Path must not end with a slash')
  })
})