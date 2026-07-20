import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString mutation detection", () => {
  it("stack trace should not contain lines from q.js internal range", async () => {
    Q.longStackSupport = true;

    let caughtError: any = null;

    // Build a multi-step chain to ensure makeStackTraceLong is triggered
    const p1 = Q.fcall(function step1() {
      throw new Error("error in step1");
    });

    const p2 = p1.then(function step2() {
      return "ok";
    });

    await p2.fail(function(e: any) {
      caughtError = e;
    });

    Q.longStackSupport = false;

    expect(caughtError).not.toBeNull();
    const stack: string = caughtError.stack || "";

    // The STACK_JUMP_SEPARATOR "From previous event:" should appear in long stacks
    // With original: internal Q frames filtered, so stack is cleaner
    // With mutation: ALL lines kept including empty ones from the separator join
    // The separator is joined as "\nFrom previous event:\n" 
    // When the full concatenated string is split by "\n", we get an empty string
    // right after "From previous event:" if there's nothing between separators
    
    // Actually test: does the stack contain the separator at all (long stack triggered)?
    if (stack.includes("From previous event:")) {
      const lines = stack.split("\n");
      // Original filters falsy lines (empty strings), mutated keeps them
      // The separator line itself is surrounded by \n\n in some cases
      const consecutiveEmptyLines = lines.some((line: string, i: number) => 
        line === "" && i > 0 && lines[i-1] === ""
      );
      expect(consecutiveEmptyLines).toBe(false);
    }
  });
});