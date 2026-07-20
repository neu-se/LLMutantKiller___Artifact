import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.promise with a function resolver", () => {
  it("should successfully create and resolve a promise when given a function resolver", () => {
    // In the original code: if (typeof resolver !== "function") { ... throw/return }
    // So passing a valid function should work normally
    // In the mutated code: if (true) { ... throw/return }
    // So even a valid function causes the error path to execute

    const p = Q.promise(function (resolve: (value: number) => void) {
      resolve(42);
    });

    return p.then(function (value: number) {
      expect(value).toBe(42);
    });
  });
});