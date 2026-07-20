import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delete static method", () => {
  it("should delete a property from an object and return a promise for undefined", async () => {
    const obj = { a: 1, b: 2 };
    const result = await Q["delete"](obj, "a");
    expect("a" in obj).toBe(false);
    expect(result).toBe(undefined);
  });
});