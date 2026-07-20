const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.set mutation test", () => {
  it("should fail when dispatch is called with empty array instead of key-value pair", async () => {
    const obj = { prop: "initial" };
    const promise = Q(obj);

    // This should work in original but fail in mutated version
    // because mutated version passes empty array to dispatch
    await expect(promise.set("prop", "updated")).resolves.not.toThrow();

    // Verify the property was set correctly in original version
    expect(obj.prop).toBe("updated");
  });
});