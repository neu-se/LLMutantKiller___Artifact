const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.async generator function", () => {
  it("should correctly handle generator with yield and exception", async () => {
    await expect(Q.async(function* () {
      try {
        yield Q.reject(new Error("yield error"));
      } catch (e) {
        throw new Error("caught: " + e.message);
      }
    })()).rejects.toThrow("caught: yield error");
  });
});