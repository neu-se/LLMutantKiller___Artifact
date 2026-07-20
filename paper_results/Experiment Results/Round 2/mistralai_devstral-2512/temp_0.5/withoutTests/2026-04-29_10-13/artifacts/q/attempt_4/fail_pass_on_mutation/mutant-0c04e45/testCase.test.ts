const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.async generator function", () => {
  it("should correctly handle generator exceptions", async () => {
    await expect(Q.async(function* () {
      throw new Error("test error");
    })()).rejects.toThrow("test error");
  });
});