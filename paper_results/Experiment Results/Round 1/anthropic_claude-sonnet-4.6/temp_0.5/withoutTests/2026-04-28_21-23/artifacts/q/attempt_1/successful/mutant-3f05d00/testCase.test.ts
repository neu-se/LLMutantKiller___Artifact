import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.finally", () => {
  it("should be defined and work correctly on promise instances", async () => {
    const promise = Q.resolve(42);
    
    // The 'finally' method should exist on the promise prototype
    expect(typeof promise["finally"]).toBe("function");
    
    // The 'finally' method should pass through the resolved value
    const result = await promise["finally"](() => {});
    expect(result).toBe(42);
  });
});