const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.set method", () => {
  it("should correctly set a property with the given key and value", () => {
    const obj: Record<string, any> = {};
    const key = "testKey";
    const value = "testValue";

    return Q(obj)
      .set(key, value)
      .then((result: any) => {
        expect(result).toBeUndefined();
        expect(obj[key]).toBe(value);
      });
  });
});