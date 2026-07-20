import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as path from "path";

describe("isInternalFrame lower bound", () => {
  it("should not filter q.js frames at lines before qStartingLine", () => {
    Q.longStackSupport = true;

    // Get the absolute path to q.js
    const qFilePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");

    // Create an error whose stack contains a q.js frame at line 50.
    // qStartingLine is ~63 (the line of `var qStartingLine = captureLine();`).
    // Original: 50 < qStartingLine → isInternalFrame returns false → frame is KEPT
    // Mutation: true && 50 <= qEndingLine → isInternalFrame returns true → frame is FILTERED
    const customError = new Error("test error");
    customError.stack = [
      "Error: test error",
      `    at Object.<anonymous> (${qFilePath}:50:1)`,
      "    at userCode (test.ts:10:1)"
    ].join("\n");

    const innerDeferred = Q.defer();

    // We need the rejection to propagate through a .then() so that
    // makeStackTraceLong is called with a promise that has .stack set.
    const p = Q.fulfill(1)
      .then(() => {
        innerDeferred.reject(customError);
        return innerDeferred.promise;
      })
      .fail((err: Error) => {
        Q.longStackSupport = false;
        const stack = err.stack || "";
        // The frame at line 50 should be present in original but filtered in mutation
        expect(stack).toContain(`${qFilePath}:50`);
        return null;
      });

    return p;
  });
});