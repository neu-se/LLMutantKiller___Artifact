import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";

describe("stripBom", () => {
  it("should not call toString on a plain string input", () => {
    // In the original code, toString is only called if content is a Buffer.
    // In the mutated code, toString is always called (if (true)).
    // A plain string does not have a toString('utf8') method that works like Buffer's,
    // but more importantly, calling toString() on a string with an argument is valid JS
    // and returns the string itself. However, we can detect the mutation by passing
    // an object that has a toString method which would throw or behave differently
    // when called with 'utf8' argument, but only when it's NOT a Buffer.
    //
    // The key observable difference: with the mutation, toString('utf8') is called
    // on ANY input, including plain strings. For a plain string, String.prototype.toString
    // ignores arguments and just returns the string. So the output is the same for strings.
    //
    // But if we pass a non-Buffer object that has no toString method accepting 'utf8',
    // we can detect the mutation.
    //
    // Actually, the simplest approach: pass a string that starts with BOM.
    // Both original and mutated would strip it. No difference there.
    //
    // The real difference: in the mutated code, calling toString('utf8') on a string
    // is fine (returns same string). But if we pass an object whose toString() returns
    // something different from what we expect, we can detect it.
    //
    // Best approach: pass a non-Buffer object. Original code won't call toString on it,
    // mutated code will call toString('utf8') on it. If the object's toString returns
    // something unexpected, the test will fail on the mutated code.
    
    const fakeObj = {
      toString: (encoding?: string) => {
        if (encoding === 'utf8') {
          return '{"mutated": true}';
        }
        return '{"original": true}';
      },
      replace: (pattern: RegExp, replacement: string) => {
        return '{"original": true}';
      }
    };

    // In original code: Buffer.isBuffer(fakeObj) is false, so toString is NOT called.
    // content remains fakeObj, then fakeObj.replace(/^\uFEFF/, '') is called.
    // In mutated code: if (true) is always true, so toString('utf8') IS called,
    // content becomes '{"mutated": true}', then replace is called on that string.
    
    const result = stripBom(fakeObj as any);
    
    // In original: fakeObj.replace() returns '{"original": true}'
    // In mutated: '{"mutated": true}'.replace(/^\uFEFF/, '') returns '{"mutated": true}'
    expect(result).toBe('{"original": true}');
  });
});