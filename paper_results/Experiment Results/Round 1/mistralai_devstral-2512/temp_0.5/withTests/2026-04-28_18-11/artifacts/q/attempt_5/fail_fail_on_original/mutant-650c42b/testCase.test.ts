import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("dispatch function behavior", () => {
  it("should dispatch operations on objects", async () => {
    const obj = {
      value: 42,
      getValue: function() {
        return this.value;
      }
    };

    const promise = q(obj);
    const result = await promise.dispatch("getValue", []);
    expect(result).toBe(42);
  });
});