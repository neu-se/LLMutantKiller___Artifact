const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.set method", () => {
  it("should set a property and verify the value is actually set", () => {
    const obj: Record<string, any> = {};
    const key = "testKey";
    const value = "testValue";

    return Q(obj)
      .set(key, value)
      .then(() => {
        // This assertion will fail in the mutated version because
        // the property won't be set when empty array is passed
        expect(obj[key]).toBe(value);
        expect(obj).toHaveProperty(key);
      });
  });
});