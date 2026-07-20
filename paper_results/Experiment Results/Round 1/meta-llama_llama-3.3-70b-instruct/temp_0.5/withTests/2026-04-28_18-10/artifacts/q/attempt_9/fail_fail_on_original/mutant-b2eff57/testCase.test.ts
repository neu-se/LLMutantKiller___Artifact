import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
  it("should reject with the correct error when all promises are rejected with null", () => {
    const promise1 = Q.reject(null);
    const promise2 = Q.reject(undefined);
    return Q.any([promise1, promise2]).then(
      () => {
        expect(true).toBe(false);
      },
      (error: any) => {
        expect(error).toBe(null);
      }
    );
  });
});