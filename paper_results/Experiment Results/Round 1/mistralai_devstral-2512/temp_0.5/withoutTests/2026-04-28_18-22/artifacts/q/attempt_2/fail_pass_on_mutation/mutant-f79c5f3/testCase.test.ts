import { any } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any behavior with rejected promises", () => {
  it("should resolve when any promise in the array is fulfilled", (done) => {
    const promises = [
      Promise.reject(new Error("first error")),
      Promise.reject(new Error("second error")),
      Promise.resolve("success")
    ];

    any(promises).then((result: unknown) => {
      expect(result).toBe("success");
      done();
    }).catch((err: unknown) => {
      done(err as Error);
    });
  });
});