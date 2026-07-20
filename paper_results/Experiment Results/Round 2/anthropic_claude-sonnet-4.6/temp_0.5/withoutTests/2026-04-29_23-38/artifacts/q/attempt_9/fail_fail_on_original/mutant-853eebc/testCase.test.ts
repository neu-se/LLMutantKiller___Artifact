describe("array_map fallback behavior", () => {
  it("should collect mapped values when Array.prototype.map is unavailable at load time", async () => {
    const originalMap = Array.prototype.map;
    // @ts-ignore
    delete Array.prototype.map;
    
    jest.resetModules();
    
    let Q: any;
    jest.isolateModules(() => {
      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    });
    
    // Restore immediately
    Array.prototype.map = originalMap;
    
    // allSettled uses array_map internally
    // Original: collect.push works -> proper mapping
    // Mutated: collect.push removed -> returns array of undefineds
    const result = await Q.allSettled([Q.resolve(1), Q.resolve(2)]);
    
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ state: "fulfilled", value: 1 });
    expect(result[1]).toEqual({ state: "fulfilled", value: 2 });
  });
});