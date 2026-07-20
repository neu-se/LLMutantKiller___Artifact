import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js"

describe("stripBom", () => {
  it("should return a string unchanged when given a regular string (not a Buffer)", () => {
    // In the original code, only Buffer inputs are converted via toString('utf8')
    // In the mutated code, `if (true)` always calls content.toString('utf8')
    // A plain string does not have a toString('utf8') method signature that works the same way
    // Actually, strings do have toString() but not toString('utf8') - toString() ignores arguments
    // So for a string, toString('utf8') would just call toString() and return the string itself
    // We need a case where calling toString('utf8') on a non-Buffer would fail or behave differently
    
    // The key difference: if we pass a non-Buffer object that has a toString method
    // but calling toString('utf8') would produce different output than the original
    
    // Let's create an object with a custom toString that detects the 'utf8' argument
    const customObj = {
      toString(encoding?: string) {
        if (encoding === 'utf8') {
          return 'called-with-utf8'
        }
        return 'called-without-encoding'
      },
      replace(pattern: RegExp, replacement: string) {
        return this.toString().replace(pattern, replacement)
      }
    }
    
    // In original code: Buffer.isBuffer(customObj) is false, so toString is NOT called
    // content remains the customObj, then replace is called on it
    // In mutated code: if (true), so content = customObj.toString('utf8') = 'called-with-utf8'
    // then 'called-with-utf8'.replace(/^\uFEFF/, '') = 'called-with-utf8'
    
    // But in original, customObj.replace(/^\uFEFF/, '') would be called
    // which calls customObj.toString() (no args) = 'called-without-encoding'
    // then replaces = 'called-without-encoding'
    
    // So original returns 'called-without-encoding', mutant returns 'called-with-utf8'
    const result = stripBom(customObj as any)
    expect(result).toBe('called-without-encoding')
  })
})