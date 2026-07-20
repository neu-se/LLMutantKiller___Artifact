const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.keys() behavior", () => {
  it("should return the keys of a fulfilled object promise", async () => {
    const testObject = { a: 1, b: 2, c: 3 };
    const keys = await Q.keys(testObject);
    expect(keys).toEqual(["a", "b", "c"]);
  });
});