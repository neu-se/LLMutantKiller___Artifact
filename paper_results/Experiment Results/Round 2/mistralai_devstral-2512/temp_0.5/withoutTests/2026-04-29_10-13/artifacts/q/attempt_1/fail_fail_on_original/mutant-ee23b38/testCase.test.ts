import { Q } from "./q.js";

describe("Promise.prototype.set", () => {
  it("should resolve with the set value when setting a property on a fulfilled promise", async () => {
    const obj = {};
    const promise = Q(obj);
    const result = await promise.set("key", "value");
    expect(obj.key).toBe("value");
    expect(result).toBeUndefined();
  });
});