import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame operator precedence mutation", () => {
  it("should not filter stack frames from files other than q.js", async () => {
    Q.longStackSupport = true;

    // We need to create an error whose stack contains frames from THIS file
    // at line numbers that would be <= qEndingLine (which is ~1800+)
    // Since this test file has small line numbers, with the mutation those frames
    // would be incorrectly treated as "internal" and filtered out
    
    // Create a deep call stack to ensure we have frames from this file
    function level3(): never {
      throw new Error("test error at level3");
    }
    function level2() {
      return level3();
    }
    function level1() {
      return level2();
    }

    let caughtError: Error | null = null;

    await new Promise<void>((resolve) => {
      Q.fcall(level1).fail(function(err: Error) {
        caughtError = err;
        resolve();
      });
    });

    expect(caughtError).not.toBeNull();
    const stack = (caughtError as Error).stack!;

    // With original code: isInternalFrame only filters q.js lines
    // With mutated code: isInternalFrame also filters ANY line with lineNumber <= qEndingLine
    // Since qEndingLine ~ 1800, frames from this test file (small line numbers) get filtered
    
    // The stack should reference "level3" or "level2" or "level1" from this test file
    // These would be filtered by the mutation since they're at small line numbers
    expect(stack).toMatch(/level[123]/);

    Q.longStackSupport = false;
  });
});