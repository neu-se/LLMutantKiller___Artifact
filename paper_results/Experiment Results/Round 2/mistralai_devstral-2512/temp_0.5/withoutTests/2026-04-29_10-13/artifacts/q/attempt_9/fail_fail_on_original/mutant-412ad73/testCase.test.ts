// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_9/pending_category/mutant-412ad73/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library bootstrap behavior", () => {
  it("should execute bootstrap when available in Montage environment", () => {
    // Create a flag to track if bootstrap was executed
    let bootstrapExecuted = false;
    const originalBootstrap = (global as any).bootstrap;

    // Create a mock bootstrap that sets our flag
    (global as any).bootstrap = (name: string, definition: any) => {
      bootstrapExecuted = true;
      return definition();
    };

    // Clear module cache and reload Q
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const freshQ = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // In original code, bootstrap should be executed
    // In mutated code (if (false)), bootstrap should NOT be executed
    expect(bootstrapExecuted).toBe(true);

    // Restore original bootstrap if it existed
    if (originalBootstrap !== undefined) {
      (global as any).bootstrap = originalBootstrap;
    } else {
      delete (global as any).bootstrap;
    }
  });
});