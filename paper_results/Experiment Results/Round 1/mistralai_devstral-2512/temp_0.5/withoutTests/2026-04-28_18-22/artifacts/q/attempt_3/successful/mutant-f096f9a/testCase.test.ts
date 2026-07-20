const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.any", () => {
  it("should resolve when at least one promise fulfills", async () => {
    const promises = [
      Q.reject(new Error("First error")),
      Q.resolve("success"),
      Q.reject(new Error("Second error"))
    ];

    const result = await Q.any(promises);
    expect(result).toBe("success");
  });
});