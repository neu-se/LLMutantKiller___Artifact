import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong with __minimumStackCounter__", () => {
  it("should use __minimumStackCounter__ to limit stack trace concatenation, setting it on the error object", async () => {
    Q.longStackSupport = true;

    // Create a chain of promises that will reject
    // The __minimumStackCounter__ property should be set on the error object
    // In the mutated version, it sets "" instead of "__minimumStackCounter__"
    // so the property check never stops the loop, potentially adding duplicate stacks

    const error = new Error("test error");
    
    // We need to verify that after makeStackTraceLong runs, 
    // the error has __minimumStackCounter__ set (original) vs not set (mutated)
    
    let capturedError: any = null;

    await new Promise<void>((resolve) => {
      Q.reject(error)
        .then(null, function(err: any) {
          capturedError = err;
          resolve();
        });
    });

    // After rejection handling, check if __minimumStackCounter__ was set
    // In original: error.__minimumStackCounter__ is set to a number
    // In mutated: error.__minimumStackCounter__ is undefined, but error[""] is set
    
    // The key observable difference: in original code, error.__minimumStackCounter__ 
    // gets defined as a non-configurable... wait it IS configurable
    // Let's check: original sets "__minimumStackCounter__", mutated sets ""
    
    // So in original: capturedError.__minimumStackCounter__ should be defined (a number)
    // In mutated: capturedError.__minimumStackCounter__ should be undefined
    //             capturedError[""] should be defined (a number)
    
    expect(capturedError).not.toBeNull();
    
    // In original code, __minimumStackCounter__ is set on the error
    expect(typeof capturedError.__minimumStackCounter__).toBe("number");
    
    // In mutated code, "" property is set instead
    // This assertion passes in original, fails in mutated
    expect(capturedError[""]).toBeUndefined();
  });
});