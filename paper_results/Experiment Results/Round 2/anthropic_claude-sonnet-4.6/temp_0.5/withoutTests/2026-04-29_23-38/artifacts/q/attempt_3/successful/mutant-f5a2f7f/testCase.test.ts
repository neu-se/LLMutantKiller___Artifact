import { createRequire } from "module";

describe("Q captureLine", () => {
  it("should handle missing stacks gracefully", () => {
    // Save original Error
    const OriginalError = global.Error;
    
    // Mock Error to not produce stacks
    class NoStackError extends Error {
      constructor(msg?: string) {
        super(msg);
        this.stack = undefined as any;
      }
    }
    global.Error = NoStackError as any;
    
    jest.resetModules();
    
    try {
      // Re-require Q - if mutation is present, captureLine won't early-return
      // when hasStacks is false, and will try to call undefined.split() -> crash
      const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
      // Original: hasStacks=false -> captureLine returns early -> no crash
      // Mutated: if(false) -> never returns early -> tries e.stack.split() -> crash
      expect(Q).toBeDefined();
    } finally {
      global.Error = OriginalError;
      jest.resetModules();
    }
  });
});