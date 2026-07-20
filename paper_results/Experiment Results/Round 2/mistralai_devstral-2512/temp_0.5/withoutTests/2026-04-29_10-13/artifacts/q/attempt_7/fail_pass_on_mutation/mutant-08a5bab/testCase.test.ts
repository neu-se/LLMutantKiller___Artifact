const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly filter internal Q frames while preserving application frames", () => {
    // Create a function that will appear in the stack trace
    function applicationFunction() {
      const error = new Error("Test error");
      const deferred = Q.defer();
      deferred.reject(error);
      return deferred.promise;
    }

    // Call the function and handle the rejection
    return applicationFunction().catch((e: any) => {
      // In the original version, the stack should contain application frames
      // In the mutated version, all frames are considered internal and filtered out
      const stackLines = e.stack ? e.stack.split('\n') : [];
      const hasApplicationFrame = stackLines.some(line =>
        line.includes('applicationFunction')
      );

      // This should be true in original version, false in mutated version
      expect(hasApplicationFrame).toBe(true);
    });
  });
});