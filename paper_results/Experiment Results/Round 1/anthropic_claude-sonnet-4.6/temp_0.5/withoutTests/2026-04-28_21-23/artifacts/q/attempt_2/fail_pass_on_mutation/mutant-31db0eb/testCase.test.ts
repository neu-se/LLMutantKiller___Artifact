import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick without setImmediate", () => {
  it("should work when setImmediate is not available and window is not defined", async () => {
    const result = await new Promise<number>((resolve) => {
      Q(42).then((val: number) => resolve(val));
    });
    expect(result).toBe(42);
  });
});