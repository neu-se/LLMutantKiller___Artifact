import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
  it("should correctly resolve a simple promise", async () => {
    const result = await Q.Promise((resolve: (v: number) => void) => {
      resolve(42);
    });
    expect(result).toBe(42);
  });
});