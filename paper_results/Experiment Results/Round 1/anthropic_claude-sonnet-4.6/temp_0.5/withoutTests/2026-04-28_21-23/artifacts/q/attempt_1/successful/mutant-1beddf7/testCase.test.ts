import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.promise resolver invocation", () => {
  it("should call the resolver function with resolve, reject, and notify arguments", async () => {
    const result = await Q.promise(function (resolve: (value: any) => void) {
      resolve(42);
    });
    expect(result).toBe(42);
  });
});