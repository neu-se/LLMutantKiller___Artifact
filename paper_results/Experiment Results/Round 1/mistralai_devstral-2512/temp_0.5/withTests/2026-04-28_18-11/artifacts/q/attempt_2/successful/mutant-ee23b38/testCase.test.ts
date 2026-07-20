// Test case to detect the mutation in Promise.prototype.set
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.set behavior", () => {
  it("should set a property on the object and return undefined", async () => {
    const obj: Record<string, unknown> = {};
    const promise = Q(obj);
    const result = await promise.set("testKey", "testValue");
    expect(result).toBeUndefined();
    expect((obj as any).testKey).toBe("testValue");
  });
});