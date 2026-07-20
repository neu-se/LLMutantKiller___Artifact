import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q array_reduce fallback behavior", () => {
  it("should handle Q.all with resolved promises correctly", async () => {
    // Force reload without native Array.prototype.reduce to use the fallback
    jest.resetModules();
    
    const savedReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;
    
    let QModule: any;
    try {
      QModule = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      Array.prototype.reduce = savedReduce;
    }
    
    // Test that Q.all works - uses array_reduce internally
    const result = await QModule.all([
      QModule.resolve(1),
      QModule.resolve(2), 
      QModule.resolve(3)
    ]);
    
    expect(result).toEqual([1, 2, 3]);
  });
});