import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick requestTick mutation", () => {
  it("should resolve promises using a valid tick mechanism", async () => {
    const result = await Q.Promise((resolve: (v: number) => void) => {
      resolve(42);
    });
    expect(result).toBe(42);
  });
});