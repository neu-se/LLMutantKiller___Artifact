describe("object_keys fallback", () => {
  it("should push keys in the fallback implementation", async () => {
    const savedKeys = Object.keys;
    (Object as any).keys = undefined;
    jest.resetModules();
    const Q = (await import("../../../../../../../../../../../subject_repositories/q/q.js")).default;
    Object.keys = savedKeys;
    
    const obj = { a: 1, b: 2 };
    const keys = await Q.keys(obj);
    expect(keys.sort()).toEqual(["a", "b"]);
  });
});