const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.async with ES6 generators", () => {
  it("should resolve with the returned value from a generator", async () => {
    const asyncFn = Q.async(function* () {
      return 42;
    });

    return asyncFn().then((result) => {
      expect(result).toBe(42);
    });
  });
});