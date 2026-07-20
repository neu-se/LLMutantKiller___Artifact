import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.set", () => {
  it("should set a property on the resolved object", () => {
    const obj: any = {};
    return Q(obj)
      .set("testKey", "testValue")
      .then((result: any) => {
        expect(result).toBeUndefined();
        expect((obj as any).testKey).toBe("testValue");
      });
  });
});