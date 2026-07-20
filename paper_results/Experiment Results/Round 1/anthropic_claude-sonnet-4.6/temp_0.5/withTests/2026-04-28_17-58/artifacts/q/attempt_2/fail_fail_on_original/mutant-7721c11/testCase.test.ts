import { createRequire } from "module";

describe("array_indexOf fallback", () => {
  it("should find elements in an array when native indexOf is unavailable", () => {
    // Save and remove native indexOf before loading the module
    const originalIndexOf = Array.prototype.indexOf;
    // @ts-ignore
    delete Array.prototype.indexOf;

    // Clear module cache to force re-evaluation of q.js with the fallback
    const requirePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[requirePath];

    let Q: any;
    try {
      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      // Restore indexOf immediately after module load
      Array.prototype.indexOf = originalIndexOf;
    }

    // Now test that untrackRejection works correctly via array_indexOf fallback
    Q.resetUnhandledRejections();

    const reason = new Error("test error");
    const p = Q.reject(reason);

    // Initially tracked
    expect(Q.getUnhandledReasons().length).toBe(1);

    // Handling the rejection calls untrackRejection which uses array_indexOf
    // With the mutation (if false), array_indexOf always returns -1,
    // so untrackRejection never removes the rejection from tracking
    p.fail(function() { return null; });

    // Should be untracked now (length 0)
    // With the mutation, array_indexOf returns -1, so it stays at 1
    expect(Q.getUnhandledReasons().length).toBe(0);
  });
});