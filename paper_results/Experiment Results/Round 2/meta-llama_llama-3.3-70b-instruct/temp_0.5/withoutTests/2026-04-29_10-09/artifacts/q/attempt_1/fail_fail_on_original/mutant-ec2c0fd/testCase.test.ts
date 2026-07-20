import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.async", () => {
  it("should handle ES6 generators correctly", () => {
    function* generator() {
      try {
        yield Promise.resolve(1);
      } catch (e) {
        throw new Error("Test error");
      }
    }

    const asyncGenerator = Q.async(generator);
    const promise = asyncGenerator();

    promise.then(
      (value) => {
        throw new Error("Should not be fulfilled");
      },
      (reason) => {
        expect(reason.message).toBe("Test error");
      }
    );
  });
});