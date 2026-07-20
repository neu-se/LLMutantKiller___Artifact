import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.finally", () => {
  it("should be accessible as 'finally' method on a promise and execute callback", async () => {
    const promise = Q.resolve(42);
    
    // The 'finally' method should exist on the promise
    expect(typeof promise["finally"]).toBe("function");
    
    // The 'finally' method should work correctly
    let callbackCalled = false;
    const result = await promise["finally"](function() {
      callbackCalled = true;
    });
    
    expect(callbackCalled).toBe(true);
    expect(result).toBe(42);
  });
});