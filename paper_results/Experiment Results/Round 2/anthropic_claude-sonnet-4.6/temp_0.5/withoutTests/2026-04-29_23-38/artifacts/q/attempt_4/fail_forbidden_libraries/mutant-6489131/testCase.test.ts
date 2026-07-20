import { describe, it, expect } from "@jest/globals";

describe("Q reduce fallback", () => {
  it("detects mutation in array_reduce fallback no-initial-value path", async () => {
    const originalReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;
    jest.resetModules();
    const Q = (await import("../../../../../../../../../../../subject_repositories/q/q.js")).default;
    Array.prototype.reduce = originalReduce;

    const results = await Q.allSettled([Q.resolve(1), Q.reject(new Error("e")), Q.resolve(3)]);
    expect(results[0]).toEqual({ state: "fulfilled", value: 1 });
    expect(results[1].state).toBe("rejected");
    expect(results[2]).toEqual({ state: "fulfilled", value: 3 });
  });
});