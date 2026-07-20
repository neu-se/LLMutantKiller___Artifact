import { any } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any behavior with all rejected promises", () => {
  it("should never resolve when all promises are rejected", (done) => {
    const promises = [
      Promise.reject(new Error("first error")),
      Promise.reject(new Error("second error")),
      Promise.reject(new Error("third error"))
    ];

    any(promises).then(() => {
      done(new Error("Should not resolve when all promises are rejected"));
    }).catch(() => {
      // Expected behavior - should reject
      done();
    });
  });
});