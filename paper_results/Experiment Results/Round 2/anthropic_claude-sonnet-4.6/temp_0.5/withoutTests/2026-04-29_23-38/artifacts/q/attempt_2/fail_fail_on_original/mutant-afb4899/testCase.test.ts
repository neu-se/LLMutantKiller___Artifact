import { createRequire } from "module";

const _require = createRequire(import.meta.url);

describe("Q getFileNameAndLineNumber attempt2 regex", () => {
  it("should use end-anchored regex to avoid matching lines with trailing content", async () => {
    // Override Error.prepareStackTrace to produce anonymous lines with trailing content
    // This simulates a stack format where lines end with " extra" after :col
    const originalPrepareStackTrace = (Error as any).prepareStackTrace;
    (Error as any).prepareStackTrace = function(err: Error, structuredStackTrace: any[]) {
      return structuredStackTrace.map((frame: any) => {
        const fileName = frame.getFileName() || '';
        const lineNumber = frame.getLineNumber() || 0;
        const colNumber = frame.getColumnNumber() || 0;
        return `    at ${fileName}:${lineNumber}:${colNumber} extra`;
      }).join('\n');
    };
    
    // Reload Q so captureLine runs with the new stack format
    jest.resetModules();
    const Q = _require('../../../../../../../../../../../subject_repositories/q/q.js');
    const qPath = _require.resolve('../../../../../../../../../../../subject_repositories/q/q.js');
    
    Q.longStackSupport = true;
    
    // Create a rejection that goes through Q's internal code
    let caughtError: any;
    await new Promise<void>((resolve) => {
      Q.fcall(() => { throw new Error("test"); })
        .then(null, (e: any) => {
          caughtError = e;
          resolve();
        });
    });
    
    // Restore original
    (Error as any).prepareStackTrace = originalPrepareStackTrace;
    
    // With original code: qFileName = undefined → Q's frames are NOT filtered → stack contains qPath
    // With mutated code: qFileName = qPath → Q's frames ARE filtered → stack does NOT contain qPath
    
    expect(caughtError).toBeDefined();
    expect(caughtError.message).toBe("test");
    
    // The stack should contain Q's file path (Q's frames are not filtered in original code)
    expect(caughtError.stack).toContain(qPath);
  });
});