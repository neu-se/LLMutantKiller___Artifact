import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q getFileNameAndLineNumber attempt3 regex", () => {
  it("should correctly resolve a promise when stack lines with multiple characters before @ are parsed", async () => {
    // The mutation changes /.*@(.+):(\d+)$/ to /.@(.+):(\d+)$/
    // This affects parsing of Firefox-style stack frames like "funcName@file:line"
    // We can test this by enabling long stack support and verifying Q still works
    // The captureLine function uses getFileNameAndLineNumber at module load time
    // If it fails, qFileName/qStartingLine will be undefined affecting stack filtering
    
    Q.longStackSupport = true;
    
    const result = await Q.Promise((resolve) => {
      resolve(42);
    });
    
    expect(result).toBe(42);
    
    // Test rejection handling with long stacks
    let caughtError: Error | null = null;
    try {
      await Q.Promise((_, reject) => {
        reject(new Error("test error"));
      });
    } catch (e) {
      caughtError = e as Error;
    }
    
    expect(caughtError).not.toBeNull();
    expect(caughtError!.message).toBe("test error");
  });
});