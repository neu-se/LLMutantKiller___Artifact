const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.async with generator", () => {
  it("should handle generator return values correctly", async () => {
    const result = await Q.async(function* () {
      const value = yield Q.resolve(42);
      return value;
    })();
    expect(result).toBe(42);
  });
});