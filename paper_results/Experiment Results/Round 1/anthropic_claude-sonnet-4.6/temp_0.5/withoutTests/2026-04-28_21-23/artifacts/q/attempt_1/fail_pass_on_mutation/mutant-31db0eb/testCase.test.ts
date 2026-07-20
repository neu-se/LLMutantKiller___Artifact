import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise basic functionality", () => {
  it("should resolve a simple promise correctly", async () => {
    const result = await Q.Promise(function(resolve: (value: number) => void) {
      resolve(42);
    });
    expect(result).toBe(42);
  });
});