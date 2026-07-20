import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.finally", () => {
  it("should be accessible as 'finally' on a promise instance and execute the callback when fulfilled", async () => {
    const promise = Q("foo");
    
    // In the original code, Promise.prototype["finally"] is set correctly.
    // In the mutated code, Promise.prototype[""] is set instead, so "finally" would be undefined.
    expect(typeof promise["finally"]).toBe("function");
    
    let called = false;
    const result = await promise["finally"](function() {
      called = true;
    });
    
    expect(called).toBe(true);
    expect(result).toBe("foo");
  });
});