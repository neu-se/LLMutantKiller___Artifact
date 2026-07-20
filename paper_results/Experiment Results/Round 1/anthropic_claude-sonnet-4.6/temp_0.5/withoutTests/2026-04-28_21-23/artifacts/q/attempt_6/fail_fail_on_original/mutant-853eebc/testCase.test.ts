describe("array_map fallback behavior", () => {
  it("should correctly map array elements using array_map", async () => {
    const originalMap = Array.prototype.map;
    
    // Temporarily remove native map so the fallback is captured at module load
    Object.defineProperty(Array.prototype, "map", {
      value: undefined,
      configurable: true,
      writable: true
    });
    
    jest.resetModules();
    
    let Q: any;
    try {
      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      // Restore before any assertions
      Object.defineProperty(Array.prototype, "map", {
        value: originalMap,
        configurable: true,
        writable: true
      });
    }
    
    const promises = [Q.resolve(1), Q.resolve(2), Q.resolve(3)];
    const results = await Q.allSettled(promises);
    
    expect(results).toHaveLength(3);
    expect(results[0]).toEqual({ state: "fulfilled", value: 1 });
    expect(results[1]).toEqual({ state: "fulfilled", value: 2 });
    expect(results[2]).toEqual({ state: "fulfilled", value: 3 });
  });
});