import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as fs from "fs";

describe("isInternalFrame qStartingLine boundary", () => {
  it("uses >= (not >) to filter frames at exactly qStartingLine", async () => {
    Q.longStackSupport = true;
    
    try {
      // Get qFileName by examining a promise's raw stack
      const d0 = Q.defer();
      const rawStack: string = (d0.promise as any).stack || "";
      
      if (!rawStack) {
        return;
      }
      
      // Extract q.js filename from the raw stack
      const match = rawStack.match(/\((.+[/\\]q\.js):\d+:\d+\)/);
      if (!match) {
        return;
      }
      const qFileName = match[1];
      
      // Find qStartingLine by reading the q.js file
      const content = fs.readFileSync(qFileName, "utf-8");
      const lines = content.split("\n");
      let qStartingLine = -1;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes("var qStartingLine = captureLine();")) {
          qStartingLine = i + 1; // 1-indexed
          break;
        }
      }
      
      if (qStartingLine === -1) {
        return;
      }
      
      // Create a deferred and override its stack with a line at qStartingLine
      const d = Q.defer();
      (d.promise as any).stack = `    at Object.<anonymous> (${qFileName}:${qStartingLine}:1)`;
      
      // Reject the deferred
      d.reject(new Error("test error"));
      
      // Catch the error and examine its filtered stack
      const err = await d.promise.catch((e: Error) => e);
      const filteredStack: string = (err as Error).stack || "";
      
      // With original (>=): isInternalFrame returns true for qStartingLine
      //   → line is filtered → doesn't appear in filteredStack
      // With mutation (>): isInternalFrame returns false for qStartingLine
      //   → line is NOT filtered → appears in filteredStack
      expect(filteredStack).not.toContain(`${qFileName}:${qStartingLine}`);
    } finally {
      Q.longStackSupport = false;
    }
  });
});