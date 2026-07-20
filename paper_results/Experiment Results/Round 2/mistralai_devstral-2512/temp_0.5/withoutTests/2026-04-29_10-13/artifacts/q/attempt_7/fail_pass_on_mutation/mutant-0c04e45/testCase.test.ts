const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.async generator function", () => {
  it("should correctly handle generator with direct throw", async () => {
    await expect(Q.async(function* () {
      throw new Error("direct throw");
    })()).rejects.toThrow("direct throw");
  });
});