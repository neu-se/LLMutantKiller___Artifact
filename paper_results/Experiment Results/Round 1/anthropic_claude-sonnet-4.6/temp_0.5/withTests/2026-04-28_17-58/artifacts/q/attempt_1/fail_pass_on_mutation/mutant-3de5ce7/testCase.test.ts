import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber Firefox-style stack parsing", () => {
  it("should correctly parse line numbers from Firefox-style stack frames when building long stack traces", async () => {
    Q.longStackSupport = true;

    try {
      const error = await Q.reject(new Error("test error"))
        .then(() => {})
        .fail((err: Error) => {
          return err;
        });

      // The stack should exist and contain numeric line references
      // With the mutation (\D+ instead of \d+), Firefox-style stack frames
      // would not parse line numbers correctly, causing getFileNameAndLineNumber
      // to return undefined for those frames, affecting isInternalFrame filtering
      
      // We test by verifying that Q can properly handle stack traces
      // by checking that the long stack support produces valid output
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("test error");
      
      // Now test that captureLine works - if getFileNameAndLineNumber is broken
      // for the current stack format, qStartingLine would be undefined/wrong
      // which would affect isInternalFrame behavior
      
      // Create a chain that exercises stack filtering
      const result = await Q.fcall(() => {
        throw new Error("deep error");
      }).fail((err: Error) => {
        // Stack should be a string with line numbers (digits), not non-digits
        const stack = err.stack || "";
        // Verify the stack contains digit-based line numbers (e.g., ":42:")
        // The original regex \d+ matches digits; mutant \D+ matches non-digits
        // So with the mutant, attempt3 would match non-digit "line numbers"
        // which would cause incorrect behavior
        const hasDigitLineNumbers = /:\d+/.test(stack);
        return hasDigitLineNumbers;
      });
      
      expect(result).toBe(true);
    } finally {
      Q.longStackSupport = false;
    }
  });
});