const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.set mutation test", () => {
  it("should correctly set property value through promise chain", () => {
    const obj = { value: 0 };
    const promise = Q(obj);

    return promise.set("value", 42).then(() => {
      expect(obj.value).toBe(42);
    });
  });
});