import { describe, it, expect, beforeAll } from "@jest/globals";

describe("array_reduce fallback", () => {
  it("should use provided basis when reduce called with initial value", async () => {
    const originalReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;
    
    jest.resetModules();
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    
    Array.prototype.reduce = originalReduce;
    
    const result = await Q.all([Q.resolve(1), Q.resolve(2), Q.resolve(3)]);
    expect(result).toEqual([1, 2, 3]);
  });
});