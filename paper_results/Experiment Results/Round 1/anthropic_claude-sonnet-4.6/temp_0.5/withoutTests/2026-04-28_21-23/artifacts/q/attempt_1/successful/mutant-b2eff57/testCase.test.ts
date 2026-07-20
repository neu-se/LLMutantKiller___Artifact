import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any with rejected promises", () => {
  it("should reject with an Error object when all promises are rejected with a falsy reason", async () => {
    // When err is falsy (e.g., null, undefined, 0, ""), the original code uses:
    //   var rejection = err || new Error("" + err);
    // which creates a new Error. The mutated code uses:
    //   var rejection = err && new Error("" + err);
    // which would return the falsy value itself (null/undefined/0/"")
    // causing rejection.message to fail or behave differently.

    const promises = [
      Q.reject(null),
      Q.reject(null),
    ];

    try {
      await Q.any(promises);
      // Should not reach here
      expect(true).toBe(false);
    } catch (rejection) {
      // In the original code, rejection should be an Error object with a message
      expect(rejection).toBeInstanceOf(Error);
      expect(typeof rejection.message).toBe("string");
      expect(rejection.message).toContain("Q can't get fulfillment value from any promise");
    }
  });
});