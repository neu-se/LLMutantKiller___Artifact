import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise inspect function behavior", () => {
  it("should return the correct fulfilled state when inspecting a fulfilled promise", () => {
    // Q.fulfill creates a Promise with an inspect function that returns {state: "fulfilled", value: ...}
    // The original code: if (inspect === void 0) { inspect = defaultFn } -- only sets default when NOT provided
    // The mutated code: if (inspect !== void 0) { inspect = defaultFn } -- overwrites when IS provided
    // So with the mutation, the inspect function passed to fulfill() would be overwritten
    // and inspect() would return {state: "unknown"} instead of {state: "fulfilled", value: 42}
    const fulfilledPromise = Q.fulfill(42);
    const inspected = fulfilledPromise.inspect();
    
    expect(inspected.state).toBe("fulfilled");
    expect(inspected.value).toBe(42);
  });
});