import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with done exception", () => {
  it("resolves with exception.value when exception has done:true and StopIteration is defined", async () => {
    (global as any).StopIteration = {};
    try {
      const asyncFn = Q.async(function () {
        const err: any = new Error("stop");
        err.done = true;
        err.value = 99;
        throw err;
      });
      const result = await asyncFn();
      expect(result).toBe(99);
    } finally {
      delete (global as any).StopIteration;
    }
  });
});