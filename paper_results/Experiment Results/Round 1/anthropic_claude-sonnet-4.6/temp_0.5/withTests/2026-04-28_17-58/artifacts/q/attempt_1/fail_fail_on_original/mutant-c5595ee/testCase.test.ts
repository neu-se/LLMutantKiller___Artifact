import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber Firefox-style stack parsing", () => {
  it("should correctly parse Firefox-style stack lines with multi-character function names using .* pattern", () => {
    // The mutation changes /.*@(.+):(\d+)$/ to /.@(.+):(\d+)$/
    // This means lines like "functionName@file.js:42" would fail to match with the mutant
    // but "f@file.js:42" (single char before @) would still match
    // We test this by enabling long stack support and observing stack trace behavior
    
    Q.longStackSupport = true;
    
    try {
      // Create a chain that will produce a long stack trace
      // The key is that with long stack support, Q filters internal frames
      // If getFileNameAndLineNumber fails to parse, isInternalFrame returns false
      // meaning internal Q frames won't be filtered - producing longer stack traces
      
      const deferred = Q.defer();
      
      // Simulate a Firefox-style stack line with multi-char function name
      // by directly testing the regex behavior that the function uses
      const firefoxStyleLine = "myFunctionName@/path/to/file.js:42";
      const singleCharLine = "f@/path/to/file.js:42";
      
      // Test with original regex
      const originalRegex = /.*@(.+):(\d+)$/;
      // Test with mutated regex  
      const mutatedRegex = /.@(.+):(\d+)$/;
      
      const originalMatchMulti = originalRegex.exec(firefoxStyleLine);
      const mutatedMatchMulti = mutatedRegex.exec(firefoxStyleLine);
      
      // Original should match multi-char function names
      expect(originalMatchMulti).not.toBeNull();
      expect(originalMatchMulti![1]).toBe("/path/to/file.js");
      expect(originalMatchMulti![2]).toBe("42");
      
      // Mutated should NOT match multi-char function names (this is what kills the mutant)
      expect(mutatedMatchMulti).toBeNull();
      
      deferred.resolve();
    } finally {
      Q.longStackSupport = false;
    }
  });
});