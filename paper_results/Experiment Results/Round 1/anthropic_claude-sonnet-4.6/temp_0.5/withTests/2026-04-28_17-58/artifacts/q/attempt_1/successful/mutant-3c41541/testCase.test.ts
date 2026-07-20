import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.del dispatch", () => {
  it("should delete a property from an object using Q.del", async () => {
    const object = { a: 10, b: 20 };
    const result = await Q.del(object, "a");
    expect("a" in object).toBe(false);
    expect(result).toBe(undefined);
    expect(object.b).toBe(20);
  });
});