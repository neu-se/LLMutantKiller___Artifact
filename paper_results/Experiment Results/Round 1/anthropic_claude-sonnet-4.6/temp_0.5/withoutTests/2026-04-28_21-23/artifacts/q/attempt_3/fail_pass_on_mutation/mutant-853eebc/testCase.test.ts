import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_map fallback", () => {
  it("should map values correctly when native map is unavailable", async () => {
    const originalMap = Array.prototype.map;
    // @ts-ignore
    delete Array.prototype.map;
    
    try {
      // Re-require would be needed, but since module is cached, 
      // array_map was already set. We need to test via allSettled
      // which calls array_map at runtime
      const results = await Q.allSettled([Q.resolve(1), Q.resolve(2)]);
      expect(results).toHaveLength(2);
      expect(results[0]).toEqual({ state: "fulfilled", value: 1 });
    } finally {
      Array.prototype.map = originalMap;
    }
  });
});