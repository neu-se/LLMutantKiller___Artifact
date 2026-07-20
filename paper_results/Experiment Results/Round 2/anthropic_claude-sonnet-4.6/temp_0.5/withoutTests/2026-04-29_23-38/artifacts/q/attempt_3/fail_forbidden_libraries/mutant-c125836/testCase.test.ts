import { jest } from "@jest/globals";

describe("array_reduce fallback with initial value", () => {
  it("processes first element when initial basis is provided", async () => {
    const originalReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;
    jest.resetModules();

    const { default: Q } = await import("../../../../../../../../../../../subject_repositories/q/q.js");
    Array.prototype.reduce = originalReduce;

    const result = await Q.all([Q.resolve(42)]);
    expect(result).toEqual([42]);
  });
});