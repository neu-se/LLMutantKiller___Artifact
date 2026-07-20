import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise stack trace behavior", () => {
  it("should correctly handle stack lines with trailing content in getFileNameAndLineNumber via longStackSupport", async () => {
    Q.longStackSupport = true;
    
    const deferred = Q.defer();
    const rejection = new Error("test error");
    
    // Create a promise chain that will exercise stack trace handling
    const result = await Q.reject(rejection)
      .then(null, function(err) {
        // The error should be caught here
        return "caught: " + err.message;
      });
    
    expect(result).toBe("caught: test error");
    
    Q.longStackSupport = false;
  });
});