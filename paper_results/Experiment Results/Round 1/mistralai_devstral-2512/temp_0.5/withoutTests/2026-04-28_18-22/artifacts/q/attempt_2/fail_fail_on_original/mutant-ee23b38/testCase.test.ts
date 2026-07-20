import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.set", () => {
  it("should set a property on the resolved value", async () => {
    const obj = {};
    const promise = Q.resolve(obj);
    await promise.set("foo", "bar");
    expect((obj as any).foo).toBe("bar");
  });
});