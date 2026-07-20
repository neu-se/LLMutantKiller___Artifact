import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.any", () => {
  it("should reject with the correct error when all promises are rejected", () => {
    const promise1 = Q.reject(new Error("error1"));
    const promise2 = Q.reject(new Error("error2"));
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