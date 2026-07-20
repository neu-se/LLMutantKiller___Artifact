describe("object_keys shim", () => {
  it("returns own keys using the fallback shim when Object.keys is unavailable", () => {
    // Save and remove Object.keys to force the shim to be used
    const savedKeys = Object.keys;
    (Object as any).keys = undefined;
    
    // Clear module cache and re-require
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[modulePath];
    
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    
    // Restore Object.keys
    Object.keys = savedKeys;
    
    // Now test - the shim was used, so object_keys is the fallback function
    // In original: returns own keys; In mutated: returns empty array
    const obj = { a: 1, b: 2, c: 3 };
    return Q(obj).keys().then((keys: string[]) => {
      expect(keys.sort()).toEqual(["a", "b", "c"]);
    });
  });
});