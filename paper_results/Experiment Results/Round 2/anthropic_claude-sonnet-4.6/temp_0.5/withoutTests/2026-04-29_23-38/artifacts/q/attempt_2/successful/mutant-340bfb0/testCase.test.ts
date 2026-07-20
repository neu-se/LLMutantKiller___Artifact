import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong with __minimumStackCounter__", () => {
  it("should set __minimumStackCounter__ on error during long stack trace building, not empty string property", async () => {
    Q.longStackSupport = true;

    const originalError = new Error("test rejection");
    let capturedError: any = null;

    // Build a promise chain - the promise needs .stack set (requires longStackSupport=true during defer())
    // makeStackTraceLong is called in _rejected when a rejection handler is provided
    const p = Q.reject(originalError)
      .then(function() { return 1; }) // fulfilled handler, rejection passes through
      .then(null, function(err: any) {
        capturedError = err;
        return "handled";
      });

    await p;

    expect(capturedError).not.toBeNull();
    
    // In original: property "__minimumStackCounter__" is defined on the error
    // In mutated: property "" is defined instead, "__minimumStackCounter__" stays undefined
    const descriptor = Object.getOwnPropertyDescriptor(capturedError, "__minimumStackCounter__");
    const emptyDescriptor = Object.getOwnPropertyDescriptor(capturedError, "");
    
    // Original: __minimumStackCounter__ is set, "" is not
    // Mutated: __minimumStackCounter__ is not set, "" is set
    expect(descriptor).toBeDefined();
    expect(emptyDescriptor).toBeUndefined();
  });
});