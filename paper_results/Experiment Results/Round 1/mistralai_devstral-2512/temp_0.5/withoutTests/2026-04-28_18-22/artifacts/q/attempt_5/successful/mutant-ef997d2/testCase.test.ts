const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.master", () => {
  it("should return a promise that responds to inspect with correct state", () => {
    const obj = { value: 42 };
    const mastered = Q.master(obj);
    expect(typeof mastered.inspect).toBe("function");
    const inspection = mastered.inspect();
    expect(inspection).toHaveProperty("state", "fulfilled");
  });
});