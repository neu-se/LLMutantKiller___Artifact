import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q fulfilled object keys dispatch", () => {
  it("should return own property keys via the keys dispatch on a fulfilled promise", async () => {
    // Force usage of object_keys by calling Q.keys on a plain object
    // The fulfill handler uses object_keys(value) for the "keys" operation
    const obj = Object.create(null);
    obj.x = 1;
    obj.y = 2;
    // Override Object.keys temporarily to force the fallback path
    const originalObjectKeys = Object.keys;
    (Object as any).keys = undefined;
    try {
      const keys = await Q.keys(Q(obj));
      expect(keys.sort()).toEqual(["x", "y"]);
    } finally {
      Object.keys = originalObjectKeys;
    }
  });
});