const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("spread method behavior", () => {
  it("should correctly apply fulfilled values to callback arguments", async () => {
    const testArray = [1, 2, 3];
    const result = await Q.spread(testArray, (a: number, b: number, c: number) => {
      return a + b + c;
    });

    expect(result).toBe(6);
  });
});