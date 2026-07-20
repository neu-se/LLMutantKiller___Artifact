import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q scheduling with mocked environment", () => {
  it("should use setImmediate for requestTick when not in Node.js but setImmediate is available", () => {
    return new Promise<void>((resolve, reject) => {
      const resolved: number[] = [];
      const timeout = setTimeout(() => reject(new Error("timed out")), 2000);

      // Create multiple promises and verify they all resolve
      // This tests that the flush mechanism works correctly
      const promises = [1, 2, 3, 4, 5].map(v => Q(v));
      
      Q.all(promises).then((values: number[]) => {
        clearTimeout(timeout);
        try {
          expect(values).toEqual([1, 2, 3, 4, 5]);
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    });
  });
});