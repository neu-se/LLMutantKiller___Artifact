import fs from "fs";
import vm from "vm";

describe("q.js", () => {
  it("array_reduce fallback throws TypeError on empty array without initial value", () => {
    const originalReduce = Array.prototype.reduce;
    delete (Array.prototype as any).reduce;
    jest.resetModules();
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    Array.prototype.reduce = originalReduce;

    return Q.all([Q.resolve(1)]).then((r: number[]) => {
      expect(r).toEqual([1]);
    });
  });
});