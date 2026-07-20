import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.del", () => {
  it("should delete a property from an object when using del()", async () => {
    const obj = { a: 10, b: 20 };
    const result = await Q.fcall(() => obj).del("a");
    expect("a" in obj).toBe(false);
    expect(result).toBe(undefined);
  });
});