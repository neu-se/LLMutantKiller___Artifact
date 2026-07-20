import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.delete", () => {
  it("should delete a property from an object via the delete method on a promise", async () => {
    const object = { a: 10, b: 20 };
    const result = await Q(object).delete("a");
    expect("a" in object).toBe(false);
    expect(result).toBe(undefined);
  });
});