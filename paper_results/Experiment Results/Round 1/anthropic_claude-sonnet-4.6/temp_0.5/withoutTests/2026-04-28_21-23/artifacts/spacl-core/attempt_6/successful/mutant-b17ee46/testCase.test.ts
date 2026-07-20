import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher.for', () => {
  it('should default to version 1.1 as shown by the compiled function source containing the string 1.1', () => {
    // Get the compiled JavaScript source of the static method
    const src = Matcher.for.toString()
    // In the original, default is '1.1' - compiled JS will have = "1.1" or = '1.1'  
    // In the mutated code, default is '' - compiled JS will have = "" or = ''
    // Check that the default is NOT an empty string
    expect(src).not.toMatch(/version\s*=\s*["']["']/)
    // And that it contains 1.1
    expect(src).toMatch(/1\.1/)
  })
})