import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.async", () => {
  it("should handle ES6 generators correctly", () => {
    function* generator() {
      yield Promise.resolve(1);
    }

    const asyncGenerator = Q.async(generator);
    const promise = asyncGenerator();

    promise.then(
      (value) => {
        expect(value).toBe(1);
      },
      (reason) => {
        throw new Error("Should not be rejected");
      }
    );
  });
});