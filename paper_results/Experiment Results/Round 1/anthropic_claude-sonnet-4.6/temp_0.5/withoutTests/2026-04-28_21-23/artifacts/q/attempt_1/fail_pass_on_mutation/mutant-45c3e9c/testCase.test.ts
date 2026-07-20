import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick flushing mechanism", () => {
  it("should resolve a promise by triggering the flush cycle", async () => {
    // This test verifies that Q's internal nextTick mechanism properly
    // triggers the flush cycle. With the mutation (if (false) instead of
    // if (!flushing)), requestTick() is never called and promises never resolve.
    
    const result = await new Promise<number>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Promise did not resolve - nextTick flushing is broken"));
      }, 2000);

      Q.resolve(42).then((value: number) => {
        clearTimeout(timeout);
        resolve(value);
      });
    });

    expect(result).toBe(42);
  });
});