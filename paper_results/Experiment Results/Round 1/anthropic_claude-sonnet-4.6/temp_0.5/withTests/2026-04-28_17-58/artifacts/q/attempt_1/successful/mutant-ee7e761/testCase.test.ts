import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.delete", () => {
  it("should delete a property from an object using the delete method on a promise", async () => {
    const obj = { a: 1, b: 2 };
    const result = await Q(obj).delete("a");
    expect("a" in obj).toBe(false);
    expect(result).toBe(undefined);
  });
});