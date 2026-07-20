const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.any rejection behavior", () => {
  it("should reject with an error when all promises are rejected", () => {
    const promises = [
      Q.reject(new Error("First error")),
      Q.reject(new Error("Second error")),
      Q.reject(new Error("Third error"))
    ];

    return Q.any(promises)
      .then(
        () => {
          throw new Error("Expected promise to be rejected");
        },
        (error: Error) => {
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toContain("Q can't get fulfillment value from any promise");
        }
      );
  });
});