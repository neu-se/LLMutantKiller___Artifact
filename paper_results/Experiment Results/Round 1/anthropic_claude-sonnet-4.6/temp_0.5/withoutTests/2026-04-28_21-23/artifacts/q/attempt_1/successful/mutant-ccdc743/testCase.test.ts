import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.finally", () => {
  it("should call the callback and resolve with the original value when a valid function is provided", async () => {
    let callbackCalled = false;
    
    const result = await Q.resolve(42)["finally"](function () {
      callbackCalled = true;
    });
    
    expect(callbackCalled).toBe(true);
    expect(result).toBe(42);
  });
});