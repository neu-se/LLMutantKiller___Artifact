import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce fallback - TypeError on empty array without initial value", () => {
  it("should throw TypeError when reducing empty array without initial value using fallback", async () => {
    const originalReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;
    
    jest.resetModules();
    const QModule = await import("../../../../../../../../../../../subject_repositories/q/q.js");
    
    Array.prototype.reduce = originalReduce;
    
    // Now QModule uses the fallback - test that empty array reduce throws
    expect(() => {
      QModule.default.all([]).then(() => {});
    }).toThrow(TypeError);
  });
});