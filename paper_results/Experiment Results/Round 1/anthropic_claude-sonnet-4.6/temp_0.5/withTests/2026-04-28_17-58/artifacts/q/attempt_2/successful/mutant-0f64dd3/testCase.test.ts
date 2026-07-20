import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q captureLine mutation detection", () => {
  it("should handle null fileNameAndLineNumber gracefully", () => {
    // Set Error.prepareStackTrace to return an unparseable string
    // This causes getFileNameAndLineNumber to return undefined/null
    // Original: if (!fileNameAndLineNumber) { return; } → handles gracefully
    // Mutated: if (fileNameAndLineNumber) { return; } → falls through → TypeError
    
    const originalPrepareStackTrace = (Error as any).prepareStackTrace;
    (Error as any).prepareStackTrace = () => "unparseable stack";
    
    jest.resetModules();
    
    let loadError: Error | null = null;
    let freshQ: any;
    
    try {
      freshQ = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } catch (e) {
      loadError = e as Error;
    } finally {
      (Error as any).prepareStackTrace = originalPrepareStackTrace;
      jest.resetModules();
    }
    
    // Original: captureLine returns undefined gracefully → module loads
    expect(loadError).toBeNull();
    expect(typeof freshQ).toBe("function");
  });
});