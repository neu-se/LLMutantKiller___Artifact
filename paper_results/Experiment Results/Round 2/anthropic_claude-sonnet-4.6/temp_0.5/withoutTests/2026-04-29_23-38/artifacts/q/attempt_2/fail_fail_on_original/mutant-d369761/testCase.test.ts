import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_keys fallback", () => {
  it("should include own property keys when getting keys of a fulfilled promise value", async () => {
    // Force usage of the keys operation on an object
    // The fulfill "keys" handler calls object_keys(value)
    // In environments with Object.keys, this uses the native implementation
    // But we need to test the fallback - we can override Object.keys temporarily
    const originalObjectKeys = Object.keys;
    // @ts-ignore
    Object.keys = undefined;
    
    try {
      const obj = { x: 10, y: 20 };
      const keys = await Q(obj).keys();
      expect(keys.sort()).toEqual(["x", "y"]);
    } finally {
      Object.keys = originalObjectKeys;
    }
  });
});