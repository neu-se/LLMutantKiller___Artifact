import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with StopIteration", () => {
  it("should use SpiderMonkey path and resolve StopIteration value when StopIteration is defined", async () => {
    class FakeStopIteration {
      value: any;
      constructor(v: any) { this.value = v; }
    }
    (global as any).StopIteration = FakeStopIteration;

    try {
      const asyncFn = Q.async(function () {
        // Return a fake SpiderMonkey-style generator
        return {
          next: function () {
            throw new FakeStopIteration(99);
          },
          throw: function (e: any) {
            throw e;
          }
        };
      } as any);

      const result = await asyncFn();
      // Original: SpiderMonkey path catches StopIteration and returns Q(exception.value) = 99
      // Mutated: ES6 path, generator.next() throws, caught as regular exception -> rejected promise
      expect(result).toBe(99);
    } finally {
      delete (global as any).StopIteration;
    }
  });
});