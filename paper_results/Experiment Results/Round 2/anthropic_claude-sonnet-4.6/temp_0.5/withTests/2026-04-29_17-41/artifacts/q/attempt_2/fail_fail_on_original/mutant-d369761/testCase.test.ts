// <Jest test file containing exactly one test case>
import { createRequire } from "module";

describe("object_keys fallback behavior", () => {
  it("should push keys into the array when object_keys fallback is used", () => {
    const originalKeys = Object.keys;
    // Temporarily remove Object.keys so the module fallback would be used
    // But since the module is already loaded, we need to test via the captured fallback
    // The fallback is: function(object) { var keys = []; for (var key in object) { if (hasOwn) { keys.push(key) } } return keys; }
    // We can test this by deleting Object.keys and re-requiring the module
    (Object as any).keys = undefined;
    
    // Re-require the module to pick up the fallback
    const req = createRequire(import.meta.url);
    delete req.cache[req.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const QFresh = req("../../../../../../../../../../../subject_repositories/q/q.js");
    
    Object.keys = originalKeys;
    
    const obj = { foo: 1, bar: 2 };
    return QFresh.keys(obj).then((keys: string[]) => {
      expect(keys.sort()).toEqual(["bar", "foo"]);
    });
  });
});