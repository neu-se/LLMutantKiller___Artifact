// testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.any", () => {
  it("should reject with an error when all promises are rejected", async () => {
    const promises = [
      Q.reject(new Error("Error 1")),
      Q.reject(new Error("Error 2")),
      Q.reject(new Error("Error 3")),
    ];

    await expect(Q.any(promises)).rejects.toThrow(
      "Q can't get fulfillment value from any promise, all promises were rejected. Last error message: Error 3"
    );
  });
});