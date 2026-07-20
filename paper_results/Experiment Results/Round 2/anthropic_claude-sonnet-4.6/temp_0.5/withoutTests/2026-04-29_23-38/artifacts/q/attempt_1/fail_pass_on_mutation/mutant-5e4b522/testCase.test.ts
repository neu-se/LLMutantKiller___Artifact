import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module basic functionality", () => {
  it("should resolve a simple promise value correctly", async () => {
    const result = await Q.Promise(function(resolve: (v: number) => void) {
      resolve(42);
    });
    expect(result).toBe(42);
  });
});