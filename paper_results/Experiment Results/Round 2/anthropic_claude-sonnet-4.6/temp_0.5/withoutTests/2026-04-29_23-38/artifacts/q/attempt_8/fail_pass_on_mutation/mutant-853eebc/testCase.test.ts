describe("object_keys fallback behavior", () => {
  it("should collect keys using fallback when Object.keys is unavailable at module load time", async () => {
    const originalKeys = Object.keys;
    // @ts-ignore
    Object.keys = undefined;
    
    jest.resetModules();
    
    let Q: any;
    jest.isolateModules(() => {
      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    });
    
    // Restore Object.keys immediately after module load
    Object.keys = originalKeys;
    
    const obj = { a: 1, b: 2, c: 3 };
    const result = await Q(obj).keys();
    
    // Original: fallback uses for..in + keys.push(key) -> returns ["a","b","c"]
    // Mutated: fallback uses for..in but never pushes -> returns []
    expect(result).toHaveLength(3);
    expect(result).toContain("a");
    expect(result).toContain("b");
    expect(result).toContain("c");
  });
});