import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.promise with valid resolver function", () => {
  it("should resolve when given a valid resolver function", async () => {
    // In the original code, typeof resolver !== "function" is false when a function is passed,
    // so the error branch is NOT taken and the promise resolves normally.
    // In the mutated code, the condition is always true, so even valid functions
    // trigger the error/rejection path.
    const result = await Q.promise(function (resolve: (value: number) => void) {
      resolve(42);
    });
    expect(result).toBe(42);
  });
});