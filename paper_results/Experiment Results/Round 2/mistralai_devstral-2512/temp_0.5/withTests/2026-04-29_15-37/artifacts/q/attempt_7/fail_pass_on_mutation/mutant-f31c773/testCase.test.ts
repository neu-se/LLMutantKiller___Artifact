const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.set method", () => {
  it("should set a property and verify the operation completes successfully", () => {
    const obj: Record<string, any> = {};
    const key = "testKey";
    const value = "testValue";

    return Q(obj)
      .set(key, value)
      .then(() => {
        // Verify the property was set correctly
        expect(obj[key]).toBe(value);
        // Verify the promise chain completes
        return "success";
      })
      .then((result) => {
        expect(result).toBe("success");
      });
  });
});