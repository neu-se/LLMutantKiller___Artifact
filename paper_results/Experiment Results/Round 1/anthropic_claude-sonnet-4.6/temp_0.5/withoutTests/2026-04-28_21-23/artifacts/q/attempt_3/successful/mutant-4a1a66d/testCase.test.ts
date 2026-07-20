import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with StopIteration", () => {
  it("should resolve with StopIteration value in SpiderMonkey mode", async () => {
    // Make an object whose toString returns "[object StopIteration]"
    class FakeStopIteration {
      value: any;
      [Symbol.toStringTag] = "StopIteration";
      constructor(v: any) { this.value = v; }
    }
    (global as any).StopIteration = FakeStopIteration;

    try {
      const asyncFn = Q.async(function () {
        return {
          next: function () {
            throw new FakeStopIteration(99);
          },
          throw: function (e: any) { throw e; }
        };
      } as any);

      const result = await asyncFn();
      expect(result).toBe(99);
    } finally {
      delete (global as any).StopIteration;
    }
  });
});