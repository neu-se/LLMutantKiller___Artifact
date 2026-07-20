const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.master inspect behavior", () => {
  it("should return a promise that inspects to the correct state", async () => {
    const obj = { value: 42 };
    const mastered = Q.master(obj);
    const inspection = mastered.inspect();
    expect(inspection).toHaveProperty("state", "fulfilled");
    expect(inspection).toHaveProperty("value", obj);
  });
});