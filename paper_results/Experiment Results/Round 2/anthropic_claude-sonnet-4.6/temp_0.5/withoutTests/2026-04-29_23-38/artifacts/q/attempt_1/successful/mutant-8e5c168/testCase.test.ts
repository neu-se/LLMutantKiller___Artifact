import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.Promise / promise function", () => {
  it("should resolve a promise created with Q.Promise", async () => {
    const result = await Q.Promise(function (resolve: (value: number) => void) {
      resolve(42);
    });
    expect(result).toBe(42);
  });
});