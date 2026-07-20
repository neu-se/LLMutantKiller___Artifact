import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.finally", () => {
  it("should be accessible as 'finally' method on a promise and work correctly for fulfilled promises", () => {
    const promise = Q("foo");
    
    // The mutation changes 'finally' to '' (empty string), so accessing .finally should be undefined
    // In the original, promise["finally"] should be a function
    expect(typeof promise["finally"]).toBe("function");
    
    // Also verify it actually works
    return promise["finally"](function () {
      // callback
    }).then(function (result: string) {
      expect(result).toBe("foo");
    });
  });
});