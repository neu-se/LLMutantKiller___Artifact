import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString mutation detection", () => {
  it("should filter empty lines from concatenated long stack traces", async () => {
    Q.longStackSupport = true;

    let capturedError: Error | null = null;

    // Create a promise chain that triggers makeStackTraceLong
    // The separator "\nFrom previous event:\n" when split by "\n" creates empty-string entries
    // Original code filters these out; mutated code keeps them
    const p = Q.reject(new Error("original error"));

    await p.then(() => {
      // won't run
    }).fail((err: Error) => {
      capturedError = err;
    });

    expect(capturedError).not.toBeNull();
    const stack = (capturedError as Error).stack;
    expect(stack).toBeDefined();

    if (stack) {
      // With the original code, filterStackString filters out empty/falsy lines
      // With the mutation (if (true)), empty lines are included
      // The STACK_JUMP_SEPARATOR is joined with "\n" on both sides, creating empty lines when split
      const lines = stack.split("\n");
      const hasEmptyLine = lines.some((line: string) => line.trim() === "" && line === "");
      
      // Original: no empty lines (filtered out by `&& line` check)
      // Mutated: empty lines present
      expect(hasEmptyLine).toBe(false);
    }

    Q.longStackSupport = false;
  });
});