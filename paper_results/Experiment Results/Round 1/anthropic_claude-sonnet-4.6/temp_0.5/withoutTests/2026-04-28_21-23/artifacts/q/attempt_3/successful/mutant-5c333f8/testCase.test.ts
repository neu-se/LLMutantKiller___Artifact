import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as fs from "fs";
import * as path from "path";

describe("Q isInternalFrame >= vs > for qStartingLine", () => {
  it("treats qStartingLine as internal (>= not >)", async () => {
    Q.longStackSupport = true;
    
    // Find the actual qStartingLine number
    const qjsPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    const content = fs.readFileSync(qjsPath, "utf-8");
    const fileLines = content.split("\n");
    
    let qStartingLineNumber = -1;
    for (let i = 0; i < fileLines.length; i++) {
      if (fileLines[i].trim().startsWith("var qStartingLine = captureLine()")) {
        qStartingLineNumber = i + 1; // 1-based
        break;
      }
    }
    
    expect(qStartingLineNumber).toBeGreaterThan(0);
    
    // Now we need to create a scenario where a frame at qStartingLineNumber
    // appears in a stack that Q will filter.
    // 
    // Strategy: use Error.prepareStackTrace to inject a synthetic frame
    // at qStartingLineNumber into the promise.stack that Q captures.
    
    // This is complex. Let's try a simpler approach:
    // Verify that the boundary is correct by checking that frames
    // at qStartingLineNumber are treated as internal.
    
    // We'll create a custom error with a manipulated stack that includes
    // a frame at qStartingLineNumber, then see if Q filters it.
    
    const originalPrepareStackTrace = (Error as any).prepareStackTrace;
    
    try {
      // Override prepareStackTrace to inject a frame at qStartingLineNumber
      (Error as any).prepareStackTrace = (err: Error, structuredStackTrace: any[]) => {
        // Create a fake frame at qStartingLineNumber
        const fakeFrame = {
          getFileName: () => qjsPath,
          getLineNumber: () => qStartingLineNumber,
          getFunctionName: () => "fakeQInternal",
          isNative: () => false,
          isConstructor: () => false,
          getColumnNumber: () => 1,
          toString: () => `    at fakeQInternal (${qjsPath}:${qStartingLineNumber}:1)`,
        };
        
        const allFrames = [fakeFrame, ...structuredStackTrace];
        return "Error: injected\n" + allFrames.map((f: any) => 
          `    at ${f.getFunctionName ? f.getFunctionName() || "<anonymous>" : "<anonymous>"} (${f.getFileName ? f.getFileName() : ""}:${f.getLineNumber ? f.getLineNumber() : 0}:${f.getColumnNumber ? f.getColumnNumber() : 0})`
        ).join("\n");
      };
      
      // Create an error with the injected frame
      const injectedError = new Error("injected test");
      
      // Reset prepareStackTrace so Q's internal operations work normally
      (Error as any).prepareStackTrace = originalPrepareStackTrace;
      
      // Now manually set the stack to include our fake frame
      const fakeFrame = `    at fakeQInternal (${qjsPath}:${qStartingLineNumber}:1)`;
      const stackWithFakeFrame = `Error: injected test\n${fakeFrame}\n    at Object.<anonymous> (test.js:1:1)`;
      
      // We need Q to filter this stack. Q filters promise.stack, not error.stack directly.
      // Let's create a deferred and manually set its promise.stack
      const deferred = Q.defer();
      deferred.promise.stack = stackWithFakeFrame;
      
      let filteredStack = "";
      const p = deferred.promise.then(null, (e: Error) => {
        filteredStack = e.stack || "";
      });
      
      deferred.reject(injectedError);
      await p;
      
      // With >= (original): fakeQInternal frame at qStartingLineNumber IS filtered
      // With > (mutation): fakeQInternal frame at qStartingLineNumber is NOT filtered
      expect(filteredStack).not.toContain("fakeQInternal");
      
    } finally {
      (Error as any).prepareStackTrace = originalPrepareStackTrace;
    }
  });
});