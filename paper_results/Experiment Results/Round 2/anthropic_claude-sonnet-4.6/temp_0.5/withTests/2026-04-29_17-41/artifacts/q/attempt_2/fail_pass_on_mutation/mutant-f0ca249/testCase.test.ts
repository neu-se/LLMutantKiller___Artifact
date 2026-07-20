import { createRequire } from "module";

describe("Q array_reduce polyfill", () => {
  it("resolves Q.all correctly when Array.prototype.reduce polyfill is used", async () => {
    const originalReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;

    jest.resetModules();

    let Q: any;
    try {
      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      Array.prototype.reduce = originalReduce;
    }

    const result = await Q.all([Q.resolve(1), Q.resolve(2), Q.resolve(3)]);
    expect(result).toEqual([1, 2, 3]);
  });
});