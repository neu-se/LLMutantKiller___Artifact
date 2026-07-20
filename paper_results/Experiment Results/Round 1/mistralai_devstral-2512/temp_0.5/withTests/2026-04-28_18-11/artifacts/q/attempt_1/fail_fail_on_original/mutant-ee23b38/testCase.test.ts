// Test case to detect the mutation in Promise.prototype.set
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.set behavior", () => {
  it("should set a property on the object and return undefined", async () => {
    const obj = {};
    const promise = Q(obj);
    const result = await promise.set("testKey", "testValue");
    expect(result).toBeUndefined();
    expect(obj.testKey).toBe("testValue");
  });
});