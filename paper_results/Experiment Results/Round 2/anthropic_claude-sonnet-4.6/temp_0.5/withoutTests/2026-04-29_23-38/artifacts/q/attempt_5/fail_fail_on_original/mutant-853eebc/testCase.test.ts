import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_keys fallback via fulfill keys operation", () => {
  it("should return keys of an object using the keys dispatch", async () => {
    // Test object_keys through the fulfill 'keys' handler
    // The mutation removes keys.push(key) from the object_keys fallback
    // We need to verify Object.keys shim behavior by checking if it works
    // when Object.keys is temporarily removed
    const originalObjectKeys = Object.keys;
    // @ts-ignore
    Object.keys = undefined;
    
    try {
      const obj = { x: 10, y: 20 };
      const result = await Q(obj).keys();
      expect(result).toHaveLength(2);
      expect(result).toContain("x");
      expect(result).toContain("y");
    } finally {
      Object.keys = originalObjectKeys;
    }
  });
});