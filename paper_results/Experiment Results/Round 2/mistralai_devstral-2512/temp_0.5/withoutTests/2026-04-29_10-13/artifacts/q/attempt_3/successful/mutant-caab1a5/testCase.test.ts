const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.when", () => {
  it("should resolve a value with the fulfilled callback", (done) => {
    const value = 42;
    Q.when(value, (result: number) => {
      expect(result).toBe(value);
      done();
    });
  });
});