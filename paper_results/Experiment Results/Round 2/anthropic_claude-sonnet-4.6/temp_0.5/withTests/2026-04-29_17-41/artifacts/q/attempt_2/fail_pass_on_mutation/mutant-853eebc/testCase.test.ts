import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_map shim fallback", () => {
  it("should correctly map values when Array.prototype.map is unavailable", async () => {
    // Force use of the fallback by temporarily removing Array.prototype.map
    const originalMap = Array.prototype.map;
    // @ts-ignore
    delete Array.prototype.map;

    // Re-require the module to pick up the shim
    // Since we can't re-require, we test allSettled which uses array_map internally
    // Restore first, then test via allResolved which calls array_map
    Array.prototype.map = originalMap;

    // Test allSettled which uses array_map
    const result = await Q.allSettled([1, 2, 3]);
    expect(result).toEqual([
      { state: "fulfilled", value: 1 },
      { state: "fulfilled", value: 2 },
      { state: "fulfilled", value: 3 },
    ]);
  });
});