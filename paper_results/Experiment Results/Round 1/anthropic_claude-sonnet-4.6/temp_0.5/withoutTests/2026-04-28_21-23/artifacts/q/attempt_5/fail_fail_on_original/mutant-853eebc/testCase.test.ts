describe("array_map fallback behavior", () => {
  it("should correctly map array elements when Array.prototype.map is unavailable", async () => {
    // Save original
    const originalMap = Array.prototype.map;
    
    // Remove native map to force fallback
    // @ts-ignore
    delete Array.prototype.map;
    
    // Clear module cache and re-require
    jest.resetModules();
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    
    // Restore native map
    Array.prototype.map = originalMap;
    
    // Now test allSettled which uses array_map internally
    const promises = [Q.resolve(1), Q.resolve(2), Q.resolve(3)];
    const results = await Q.allSettled(promises);
    
    expect(results).toHaveLength(3);
    expect(results[0]).toEqual({ state: "fulfilled", value: 1 });
    expect(results[1]).toEqual({ state: "fulfilled", value: 2 });
    expect(results[2]).toEqual({ state: "fulfilled", value: 3 });
  });
});