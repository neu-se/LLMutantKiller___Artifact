import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.keys", () => {
  it("should return own enumerable keys of a fulfilled object promise", () => {
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");

    // Remove cached module
    delete require.cache[modulePath];

    // Temporarily hide Object.keys so the fallback is captured
    const originalKeys = Object.keys;
    (Object as any).keys = undefined;

    let QFresh: any;
    try {
      QFresh = require(modulePath);
    } finally {
      Object.keys = originalKeys;
      // Restore cache state
      delete require.cache[modulePath];
    }

    const obj = { x: 1, y: 2 };
    return QFresh.keys(obj).then((keys: string[]) => {
      expect(keys.sort()).toEqual(["x", "y"]);
    });
  });
});