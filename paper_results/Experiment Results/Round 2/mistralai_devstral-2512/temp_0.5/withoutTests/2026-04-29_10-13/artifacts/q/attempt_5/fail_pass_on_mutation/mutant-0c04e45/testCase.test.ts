const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.async generator function", () => {
  it("should correctly handle generator with both yield and return", async () => {
    const result = await Q.async(function* () {
      const val = yield Q("yielded");
      return val + " returned";
    })("yielded");

    expect(result).toBe("yielded returned");
  });
});