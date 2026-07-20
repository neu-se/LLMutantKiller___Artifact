import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong null error handling", () => {
  it("should not throw TypeError when error is null and promise has no stack", (done) => {
    // longStackSupport is false, so promise.stack won't be set
    // This means the left side of || is false
    // Original: right side evaluates error !== null → false for null → safe
    // Mutated: right side evaluates true → proceeds to access null.__minimumStackCounter__ → TypeError
    
    Q.longStackSupport = false;

    const errors: Error[] = [];
    const originalOnerror = Q.onerror;
    
    // We need to catch any uncaught errors
    const uncaughtHandler = (err: any) => {
      errors.push(err);
    };
    process.on('uncaughtException', uncaughtHandler);

    Q.reject(null)
      .then(null, (reason) => {
        // reason is null, makeStackTraceLong(null, self) called
        // promise.stack is undefined (longStackSupport=false)
        // Original: safe, Mutated: TypeError on null.__minimumStackCounter__
        return "handled";
      })
      .then((val) => {
        expect(val).toBe("handled");
        process.removeListener('uncaughtException', uncaughtHandler);
        expect(errors.length).toBe(0);
        done();
      });
  });
});