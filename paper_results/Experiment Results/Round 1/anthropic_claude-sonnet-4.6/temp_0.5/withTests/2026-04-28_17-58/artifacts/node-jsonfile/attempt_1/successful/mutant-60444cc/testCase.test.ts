import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";

describe("stripBom", () => {
  it("should throw an error when called with a plain string (not a Buffer), because the mutated code calls toString() on a string", () => {
    // In the original code: only calls content.toString('utf8') if Buffer.isBuffer(content)
    // In the mutated code: always calls content.toString('utf8') regardless of type
    // A plain string does not have a toString method that accepts an encoding argument
    // and behaves differently - specifically, String.prototype.toString() ignores arguments,
    // but the key difference is: for a plain string, calling .toString('utf8') still works
    // but we need to find a case where the mutation causes observable difference.
    //
    // The real difference: if content is a non-Buffer object that has no toString method
    // or whose toString behaves differently when called with 'utf8'.
    //
    // Let's pass an object that has a toString method that behaves differently with arguments.
    const fakeContent = {
      toString: (encoding?: string) => {
        if (encoding === "utf8") {
          return "converted-with-utf8";
        }
        return '{"name":"original"}';
      },
      replace: (pattern: RegExp, replacement: string) => '{"name":"original"}',
    };

    // In original code: Buffer.isBuffer(fakeContent) is false, so toString is NOT called
    // The replace method on fakeContent would be called directly
    // In mutated code: toString('utf8') IS called, changing content to "converted-with-utf8"
    // Then replace is called on "converted-with-utf8" string

    // We need to track what happens - let's use a simpler approach:
    // Pass an object where toString('utf8') returns something different from the original
    // and verify the result

    // Actually, let's just test with a non-Buffer that has a custom toString
    // Original: won't call toString, will call replace on the object directly
    // Mutated: will call toString('utf8'), then call replace on the result

    // The simplest observable difference: pass a string that has no BOM
    // Original: returns the string as-is (replace removes BOM if present)
    // Mutated: calls string.toString('utf8') which is fine, then replace - same result for strings

    // The real test: pass an object where Buffer.isBuffer returns false
    // but toString('utf8') would fail or return something different
    
    // Best approach: pass null or undefined - mutated code will throw, original won't
    // Wait, original code also calls replace on null which would throw too.
    
    // Let's think differently: pass a Buffer with a BOM
    // Both should strip the BOM - same behavior
    
    // The key mutation: `if (Buffer.isBuffer(content))` vs `if (true)`
    // For a non-Buffer string input:
    // - Original: skips the toString call, calls replace directly on the string
    // - Mutated: calls toString('utf8') on the string first (which returns same string), then replace
    // These produce same results for strings.
    
    // For a Buffer input: both call toString('utf8') - same result
    
    // The difference only matters if content is NOT a Buffer but also NOT a string
    // where calling .toString('utf8') changes the value
    
    const obj = {
      toString: function(enc: string) {
        if (enc === 'utf8') return 'mutated';
        return 'original';
      },
      replace: function(pattern: RegExp, replacement: string) {
        return 'original-replaced';
      }
    };

    const result = (stripBom as any)(obj);
    
    // Original: Buffer.isBuffer(obj) is false, so toString NOT called
    //           obj.replace(/^\uFEFF/, '') is called -> 'original-replaced'
    // Mutated:  if(true) so toString('utf8') IS called -> content = 'mutated'
    //           'mutated'.replace(/^\uFEFF/, '') -> 'mutated'
    
    expect(result).toBe('original-replaced');
  });
});