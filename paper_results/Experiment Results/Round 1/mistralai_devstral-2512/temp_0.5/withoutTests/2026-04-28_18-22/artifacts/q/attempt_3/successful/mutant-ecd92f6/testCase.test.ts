const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q Promise inspection", () => {
  it("should return a valid inspection object when inspect is undefined", () => {
    const promise = Q.makePromise({});
    const inspection = promise.inspect();
    expect(inspection).toBeDefined();
    expect(typeof inspection).toBe("object");
    expect(inspection).toHaveProperty("state");
  });
});