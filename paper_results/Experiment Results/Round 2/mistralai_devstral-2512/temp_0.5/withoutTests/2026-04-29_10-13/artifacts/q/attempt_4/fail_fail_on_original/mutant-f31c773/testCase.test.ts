const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.set mutation test", () => {
  it("should correctly set a property on a promise and verify the operation", () => {
    const obj = { prop: "initial" };
    const promise = Q(obj);
    return promise.set("prop", "updated").then((result) => {
      // The original code should return the result of the set operation
      // The mutated code will fail because it's not passing the correct arguments
      expect(result).toBeDefined();
      expect(obj.prop).toBe("updated");
    });
  });
});