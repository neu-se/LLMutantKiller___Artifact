describe("Q fallback reduce", () => {
  it("allSettled works correctly with fallback array_reduce and array_map", async () => {
    const origReduce = Array.prototype.reduce;
    const origMap = Array.prototype.map;
    // @ts-ignore
    delete Array.prototype.reduce;
    // @ts-ignore  
    delete Array.prototype.map;
    jest.resetModules();
    const Q = (await import("../../../../../../../../../../../subject_repositories/q/q.js")).default;
    Array.prototype.reduce = origReduce;
    Array.prototype.map = origMap;
    
    const results = await Q.allSettled([Q.resolve(1), Q.reject(new Error("x"))]);
    expect(results[0]).toEqual({ state: "fulfilled", value: 1 });
    expect(results[1].state).toBe("rejected");
  });
});