import { dispatch } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("dispatch function behavior", () => {
  it("should dispatch operations on objects", async () => {
    const obj = {
      value: 42,
      getValue: function() {
        return this.value;
      }
    };

    const result = await dispatch(obj, "getValue", []);
    expect(result).toBe(42);
  });
});