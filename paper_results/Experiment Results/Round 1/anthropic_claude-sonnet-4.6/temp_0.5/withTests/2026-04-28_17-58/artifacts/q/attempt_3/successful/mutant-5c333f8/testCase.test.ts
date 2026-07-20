import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as fs from "fs";

describe("isInternalFrame qStartingLine boundary", () => {
  it("filters the frame at exactly qStartingLine from error stacks", async () => {
    Q.longStackSupport = true;

    try {
      // Discover qFileName by examining a deferred's stack
      const probe = Q.defer<void>();
      const probeStack = (probe.promise as any).stack as string || "";
      
      // Extract the q.js path from the stack
      const qFileMatch = probeStack.match(/\((.+q\.js):\d+:\d+\)/);
      if (!qFileMatch) {
        // Can't determine qFileName, skip test
        return;
      }
      const qFileName = qFileMatch[1];
      
      // Find qStartingLine by reading q.js
      const qSource = fs.readFileSync(qFileName, "utf-8");
      const qLines = qSource.split("\n");
      const qStartingLineIndex = qLines.findIndex((line: string) =>
        line.trim() === "var qStartingLine = captureLine();"
      );
      
      expect(qStartingLineIndex).toBeGreaterThan(-1);
      const qStartingLineNumber = qStartingLineIndex + 1;
      
      // Craft an error with a frame at exactly qStartingLine
      const err = new Error("test error");
      const frameRef = `${qFileName}:${qStartingLineNumber}:1`;
      err.stack = `Error: test error\n    at someFunction (${frameRef})\n    at Object.<anonymous> (test.js:1:1)`;
      
      const deferred = Q.defer<void>();
      
      const resultStack = await new Promise<string>((resolve) => {
        deferred.promise.then(null, (e: Error) => {
          resolve(e.stack || "");
        });
        deferred.reject(err);
      });
      
      // Original (>=): frame at qStartingLine is filtered → not in result
      // Mutation (>): frame at qStartingLine is NOT filtered → in result
      expect(resultStack).not.toContain(frameRef);
    } finally {
      Q.longStackSupport = false;
    }
  });
});