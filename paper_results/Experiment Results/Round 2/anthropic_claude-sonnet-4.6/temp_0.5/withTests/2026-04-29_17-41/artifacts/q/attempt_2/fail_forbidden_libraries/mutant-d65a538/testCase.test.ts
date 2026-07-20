import { describe, it, expect, jest } from "@jest/globals";

describe("Q captureLine early return guard", () => {
  it("gracefully handles unparseable stack traces during module initialization", () => {
    const OriginalError = global.Error;

    // Create a fake Error class that produces a stack trace that won't match
    // any of the three regex patterns in getFileNameAndLineNumber:
    // 1. /at .+ \((.+):(\d+):(?:\d+)\)$/  - named function V8
    // 2. /at ([^ ]+):(\d+):(?:\d+)$/       - anonymous V8
    // 3. /.*@(.+):(\d+)$/                  - Firefox
    class FakeError {
      message: string;
      name: string = 'Error';
      stack: string;
      
      constructor(message?: string) {
        this.message = message || '';
        this.stack = 'Error\n    no valid stack frame here\n    another invalid line\n';
      }
    }

    (global as any).Error = FakeError;

    let Q: any;
    let caughtError: unknown = null;

    jest.isolateModules(() => {
      try {
        Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
      } catch (e) {
        caughtError = e;
      }
    });

    global.Error = OriginalError;

    // In the original code: captureLine() returns early (undefined) when
    // fileNameAndLineNumber is null → module loads successfully
    // In the mutated code: captureLine() tries fileNameAndLineNumber[0] → TypeError
    // → module fails to load → caughtError is not null
    expect(caughtError).toBeNull();
    expect(typeof Q).toBe("function");
  });
});