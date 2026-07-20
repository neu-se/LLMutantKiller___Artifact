import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.any", () => {
  it("should reject with the last error message when all promises are rejected", () => {
    const promise1 = Q.reject("error1");
    const promise2 = Q.reject("error2");
    return Q.any([promise1, promise2]).then(
      () => {
        expect(true).toBe(false);
      },
      (error) => {
        expect(error.message).toBe("Q can't get fulfillment value from any promise, all promises were rejected. Last error message: error2");
      }
    );
  });
});