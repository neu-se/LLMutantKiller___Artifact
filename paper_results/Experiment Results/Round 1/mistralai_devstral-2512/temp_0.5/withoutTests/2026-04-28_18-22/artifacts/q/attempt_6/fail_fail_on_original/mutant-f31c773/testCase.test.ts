const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.set mutation test", () => {
  it("should correctly set property value and return it", async () => {
    const obj = { prop: "initial" };
    const promise = Q(obj);
    const result = await promise.set("prop", "updated");

    // The original code should return the updated value
    // The mutated code will fail because it passes empty array to dispatch
    expect(result).toBe("updated");
  });
});