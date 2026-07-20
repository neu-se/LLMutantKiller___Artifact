const q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("dispatch function behavior", () => {
  it("should dispatch operations on objects", async () => {
    const obj = {
      value: 42,
      getValue: function() {
        return this.value;
      }
    };

    const promise = q(obj);
    const result = await promise.dispatch("get", ["value"]);
    expect(result).toBe(42);
  });
});