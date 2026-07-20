describe("object_keys fallback behavior", () => {
  it("should push keys when Object.keys is not available", async () => {
    const originalKeys = Object.keys;
    // @ts-ignore
    delete Object.keys;
    
    let Q: any;
    jest.isolateModules(() => {
      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    });
    
    Object.keys = originalKeys;
    
    const obj = { a: 1, b: 2 };
    const result = await Q(obj).keys();
    
    expect(result).toHaveLength(2);
    expect(result).toContain("a");
    expect(result).toContain("b");
  });
});