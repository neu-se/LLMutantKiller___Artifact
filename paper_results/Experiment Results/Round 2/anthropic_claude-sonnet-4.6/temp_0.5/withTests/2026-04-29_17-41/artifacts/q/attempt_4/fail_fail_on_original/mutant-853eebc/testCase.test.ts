describe("array_map shim with no native map", () => {
  it("should correctly map array elements when Array.prototype.map is not available", async () => {
    const originalMap = Array.prototype.map;
    // @ts-ignore
    delete Array.prototype.map;
    
    jest.resetModules();
    const Q = (await import("../../../../../../../../../../../subject_repositories/q/q.js")).default;
    
    Array.prototype.map = originalMap;
    
    const result = await Q.allSettled([1, 2, 3]);
    expect(result.length).toBe(3);
    expect(result[0]).toEqual({ state: "fulfilled", value: 1 });
    expect(result[1]).toEqual({ state: "fulfilled", value: 2 });
    expect(result[2]).toEqual({ state: "fulfilled", value: 3 });
  });
});