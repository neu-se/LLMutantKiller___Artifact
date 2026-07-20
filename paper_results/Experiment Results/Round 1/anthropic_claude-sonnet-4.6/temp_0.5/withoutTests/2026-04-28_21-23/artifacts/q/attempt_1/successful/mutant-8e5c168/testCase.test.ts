import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.Promise", () => {
  it("should resolve a promise created with a resolver function", async () => {
    const result = await Q.Promise(function (resolve: (value: number) => void) {
      resolve(42);
    });
    expect(result).toBe(42);
  });
});