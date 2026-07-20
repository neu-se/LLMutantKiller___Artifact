import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support with named function frames", () => {
  it("should properly filter internal Q frames from stack traces when long stack support is enabled", async () => {
    Q.longStackSupport = true;
    
    function namedFunction() {
      return Q.reject(new Error("test error"));
    }
    
    let caughtError: Error | null = null;
    
    await namedFunction()
      .then(null, function(err: Error) {
        caughtError = err;
      });
    
    expect(caughtError).not.toBeNull();
    expect((caughtError as unknown as Error).stack).toContain("From previous event:");
    
    Q.longStackSupport = false;
  });
});