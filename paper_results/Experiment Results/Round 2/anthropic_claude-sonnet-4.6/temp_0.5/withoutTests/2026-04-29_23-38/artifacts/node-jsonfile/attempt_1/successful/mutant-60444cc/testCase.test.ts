import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js"

describe("stripBom", () => {
  it("should not call toString on a plain string input", () => {
    // In the original code, toString is only called if content is a Buffer.
    // In the mutated code, toString is always called (if (true)).
    // A plain string does not have a Buffer-style toString('utf8') that returns the same value
    // but we can detect the mutation by passing an object that is NOT a Buffer
    // but has a toString method that would behave differently.
    
    // Create an object that is not a Buffer but has a toString method
    // that returns something different when called with 'utf8' argument
    const fakeContent = {
      toString: (encoding?: string) => {
        if (encoding === 'utf8') {
          return 'mutated_result'
        }
        return 'original_result'
      },
      replace: (pattern: RegExp, replacement: string) => {
        return 'replaced'
      }
    }

    // In the original code: Buffer.isBuffer(fakeContent) is false, so toString is NOT called
    // The object's replace method would be called directly
    // In the mutated code: if (true) so toString IS called, converting to 'mutated_result'
    // Then 'mutated_result'.replace(/^\uFEFF/, '') would be called on the string
    
    // We need a way to observe the difference. Let's use a string input instead.
    // A string's toString('utf8') is the same as toString() - returns the string itself.
    // But wait, String.prototype.toString doesn't accept encoding arguments.
    // So passing 'utf8' to a string's toString still returns the string.
    
    // Better approach: pass a non-Buffer object that would throw or behave differently
    // when toString('utf8') is called vs not called.
    
    // Actually, the simplest approach: pass a string that has no BOM.
    // Both original and mutated should handle strings the same way since
    // String.prototype.toString() returns the string itself regardless of encoding arg.
    
    // The key difference: if we pass something that is NOT a Buffer and NOT a string,
    // the mutated code will call .toString('utf8') on it while the original won't.
    
    // Let's create an object where toString('utf8') returns something with a BOM
    // but the object itself (when used directly) would not have BOM stripped.
    
    const objectWithBom = {
      toString: (encoding?: string) => '\uFEFFhello',
      replace: String.prototype.replace
    }
    
    // In original: Buffer.isBuffer(objectWithBom) === false, so toString not called
    // objectWithBom.replace(/^\uFEFF/, '') is called - but objectWithBom.replace is String.prototype.replace
    // which would be called with `this` being objectWithBom... this gets complex.
    
    // Simplest reliable test: pass a string to stripBom
    // Original: Buffer.isBuffer(string) === false, content stays as string
    // Mutated: if(true), calls string.toString('utf8') which returns the same string
    // Both should return the same result for strings - this won't distinguish them.
    
    // Best approach: pass a Buffer with BOM
    const bufferWithBom = Buffer.from('\uFEFFhello', 'utf8')
    const result = stripBom(bufferWithBom)
    // Both original and mutated should handle Buffer the same way
    expect(result).toBe('hello')
    
    // Now test with a non-Buffer, non-string value that has a custom toString
    // In the mutated code, this will throw because the result of toString('utf8')
    // on a number doesn't have a replace method... actually numbers do have toString
    // but Number.prototype.toString(8) would interpret 8 as radix, not encoding.
    
    // Pass the number 42: 
    // Original: Buffer.isBuffer(42) === false, 42.replace() would throw
    // Mutated: if(true), (42).toString('utf8') - toString with string arg on number
    //   Number.prototype.toString accepts radix (integer), 'utf8' would be NaN radix -> throws RangeError
    
    // This is the key: in original code, non-Buffer strings pass through,
    // but a number would fail at .replace() in both cases.
    
    // The cleanest test: verify that a non-Buffer string is NOT converted via toString
    // by checking that a string input works correctly in both cases (they should be same)
    // and that the Buffer case works correctly.
    
    // Actually the mutation is: original calls toString only for Buffers, mutated always calls toString.
    // For a plain string, toString() returns the same string, so behavior is identical.
    // The ONLY observable difference is when content is NOT a Buffer and NOT a string
    // with a toString that behaves differently.
    
    // Let's verify: if we pass a non-Buffer object, original code would try to call .replace on it
    // while mutated code would call .toString('utf8') first then .replace on the result.
    
    const nonBufferObj = {
      toString: () => '\uFEFFworld',
      replace: () => { throw new Error("replace called on original object") }
    }
    
    // In original: Buffer.isBuffer(nonBufferObj) === false, so replace is called on nonBufferObj -> throws
    // In mutated: if(true), toString('utf8') called -> '\uFEFFworld', then '\uFEFFworld'.replace(/^\uFEFF/, '') -> 'world'
    
    expect(() => stripBom(nonBufferObj as any)).toThrow("replace called on original object")
  })
})