import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.set method", () => {
  it("should set a property on the object with the given key and value", () => {
    const obj = {};
    const key = "testKey";
    const value = "testValue";

    return Q(obj)
      .set(key, value)
      .then((result) => {
        expect(result).toBeUndefined();
        expect(obj[key]).toBe(value);
      });
  });
});