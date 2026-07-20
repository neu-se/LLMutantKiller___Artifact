const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q library object_defineProperty functionality", () => {
  it("should correctly use object_defineProperty to set promise stack traces", () => {
    // Enable long stack traces which uses object_defineProperty internally
    Q.longStackSupport = true;

    // Create a rejected promise which should have stack trace properties set
    const error = new Error("test error");
    const promise = Q.reject(error);

    // The original code should properly define stack-related properties
    // The mutated code (object_defineProperty = false) will fail to set these properties
    const inspectResult = promise.inspect();
    expect(inspectResult.state).toBe("rejected");
    expect(inspectResult.reason).toBe(error);

    // Check that the promise has the expected internal properties
    // that are set using object_defineProperty
    expect(promise).toHaveProperty("stackCounter");
    expect(typeof promise.stackCounter).toBe("number");
  });
});