const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.set mutation test", () => {
  it("should correctly set property value through promise chain", async () => {
    const obj = { prop: "initial" };
    const promise = Q(obj);

    // Chain multiple operations to ensure proper behavior
    const result = await promise
      .set("prop", "updated")
      .then(() => obj.prop);

    // The original code should return "updated"
    // The mutated code will fail because dispatch receives empty array
    expect(result).toBe("updated");
  });
});