import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("timeout", () => {
  it("should reject with a timeout error message when no custom error is provided and the promise is too slow", () => {
    return new Promise<void>((resolve, reject) => {
      Q.delay(200)
        .timeout(50)
        .then(
          () => {
            reject(new Error("Expected promise to be rejected due to timeout, but it was fulfilled"));
          },
          (error: Error) => {
            try {
              expect(error).toBeDefined();
              expect(error instanceof Error).toBe(true);
              expect(/time/i.test(error.message)).toBe(true);
              resolve();
            } catch (e) {
              reject(e);
            }
          }
        );
    });
  });
});