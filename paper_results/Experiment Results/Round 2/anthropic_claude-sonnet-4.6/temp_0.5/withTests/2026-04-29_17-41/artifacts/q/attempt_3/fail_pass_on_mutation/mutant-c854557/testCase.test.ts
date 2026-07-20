import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as path from "path";

describe("long stack trace filtering of anonymous frames", () => {
  it("should filter anonymous Q-internal frames with multi-digit line numbers", async () => {
    Q.longStackSupport = true;

    try {
      function triggerLongStack() {
        return Q().then(function() {
          return Q.reject(new Error("test error"));
        });
      }

      let capturedErr: any = null;
      await triggerLongStack().catch((e: any) => { capturedErr = e; });

      expect(capturedErr).not.toBeNull();
      const stack: string = capturedErr.stack || "";

      // With original: anonymous Q.js frames are filtered out by isInternalFrame
      // With mutation: attempt2 fails for line numbers >= 10, so anonymous Q.js 
      // frames are NOT filtered and appear as "at /path/to/q.js:NNN:MM"
      // Check that q.js frames don't appear in the filtered stack
      expect(stack).not.toMatch(/q\.js:\d{2,}/);
    } finally {
      Q.longStackSupport = false;
    }
  });
});