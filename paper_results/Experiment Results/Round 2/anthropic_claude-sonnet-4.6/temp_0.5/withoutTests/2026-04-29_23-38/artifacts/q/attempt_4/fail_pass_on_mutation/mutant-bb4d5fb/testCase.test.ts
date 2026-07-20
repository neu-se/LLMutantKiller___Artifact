import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame", () => {
  it("filterStackString should keep frames from non-Q files", async () => {
    Q.longStackSupport = true;

    // Force a rejection and capture the modified stack
    let capturedError: any;
    
    // Create the promise AFTER enabling longStackSupport so promise.stack is set
    const d = Q.defer();
    
    Q.nextTick(function markerFunction() {
      d.reject(new Error("marker error"));
    });

    await d.promise.then(null, function(err: any) {
      capturedError = err;
      makeStackTraceLong_trigger: {
        // makeStackTraceLong is called in _rejected inside Promise.prototype.then
        // when rejected callback is a function
      }
    });

    const stack = capturedError?.stack ?? "";
    // The stack should contain frames - with mutation all non-Q frames at low line numbers are filtered
    // markerFunction should appear in the stack
    expect(stack).toContain("markerFunction");
  });
});