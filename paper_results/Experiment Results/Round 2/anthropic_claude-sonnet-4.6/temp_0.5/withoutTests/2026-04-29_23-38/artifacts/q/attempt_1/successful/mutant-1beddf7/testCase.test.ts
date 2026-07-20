import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.promise resolver", () => {
  it("should call the resolver function with resolve, reject, and notify callbacks", async () => {
    const result = await Q.promise(function (resolve: (value: number) => void) {
      resolve(42);
    });
    expect(result).toBe(42);
  });
});