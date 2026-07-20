const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.set method", () => {
  it("should set multiple properties on the object with different keys and values", () => {
    const obj: Record<string, any> = {};
    const key1 = "testKey1";
    const value1 = "testValue1";
    const key2 = "testKey2";
    const value2 = "testValue2";

    return Q(obj)
      .set(key1, value1)
      .then(() => Q(obj).set(key2, value2))
      .then(() => {
        expect(obj[key1]).toBe(value1);
        expect(obj[key2]).toBe(value2);
      });
  });
});