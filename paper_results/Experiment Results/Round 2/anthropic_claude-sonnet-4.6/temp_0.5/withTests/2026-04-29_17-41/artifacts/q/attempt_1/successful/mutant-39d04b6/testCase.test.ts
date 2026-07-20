import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise inspect fallback", () => {
  it("should return {state: 'unknown'} when no inspect function is provided to makePromise", () => {
    const promise = Q.makePromise({
      "when": function () {
        return Q(42);
      }
    });
    
    const result = promise.inspect();
    
    expect(result).toBeDefined();
    expect(result).toEqual({ state: "unknown" });
  });
});