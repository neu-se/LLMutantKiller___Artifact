import { describe, it, expect } from "@jest/globals";

describe("array_indexOf fallback shim", () => {
  it("should iterate forward (i++) not backward (i--) in the indexOf fallback", () => {
    const originalIndexOf = Array.prototype.indexOf;
    // @ts-ignore
    delete Array.prototype.indexOf;

    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[modulePath];
    // @ts-ignore  
    const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");

    Array.prototype.indexOf = originalIndexOf;

    QFresh.resetUnhandledRejections();

    // Reject a promise - adds to unhandledRejections array
    const p = QFresh.reject(new Error("test rejection"));

    // Handle it - triggers untrackRejection -> array_indexOf on non-empty array
    // With i--, this would infinite loop. With i++, it completes.
    return p.then(null, () => {
      expect(QFresh.getUnhandledReasons().length).toBe(0);
    });
  });
});