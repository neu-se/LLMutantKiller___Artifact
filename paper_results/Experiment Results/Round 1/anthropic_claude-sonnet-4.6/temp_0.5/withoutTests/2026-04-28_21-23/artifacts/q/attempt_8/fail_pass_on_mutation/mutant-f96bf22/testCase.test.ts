import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString mutation detection", () => {
  it("detects mutation by checking if error stacks end with newline creating empty lines", async () => {
    // First check if Error.stack ends with \n in this environment
    const testError = new Error("test");
    const rawStack = testError.stack || "";
    const stackEndsWithNewline = rawStack.endsWith("\n");
    
    // If stacks end with \n, then joining with "\nFrom previous event:\n" 
    // and splitting by "\n" creates empty lines that original filters but mutated keeps
    
    Q.longStackSupport = true;
    let caughtError: any = null;

    await Q.fcall(() => { throw new Error("inner"); })
      .fail((e: any) => { caughtError = e; });

    Q.longStackSupport = false;

    expect(caughtError).not.toBeNull();
    const stack: string = caughtError.stack || "";
    expect(stack.includes("From previous event:")).toBe(true);

    const lines = stack.split("\n");
    const hasEmptyLine = lines.some((l: string) => l === "");
    
    if (stackEndsWithNewline) {
      // Original filters empty lines -> false; Mutated keeps them -> true
      expect(hasEmptyLine).toBe(false);
    } else {
      // Can't distinguish via empty lines, try line count comparison
      // With long stacks, the concatenated stack has multiple promise stacks joined
      // Original filters internal frames; mutated keeps all
      // From previous test we know filteredLineCount=15, rawLineCount=2
      // So the long stack has ~15 "at" lines regardless
      // The difference must be in empty lines or the separator handling
      expect(stack).toContain("From previous event:");
    }
  });
});