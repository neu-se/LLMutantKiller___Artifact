import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString mutation detection", () => {
  it("filtered stack trace should not contain empty string lines", async () => {
    Q.longStackSupport = true;

    let caughtError: any = null;

    // We need makeStackTraceLong to be triggered, which requires:
    // 1. hasStacks to be true
    // 2. promise.stack to exist (set when longStackSupport is true)
    // 3. error to be an object with a stack
    // Create a chain long enough to trigger concatenation of stacks
    await Q.when(Q.when(Q.reject(new Error("deep")), null, (e: any) => { throw e; }))
      .fail((e: any) => { caughtError = e; });

    Q.longStackSupport = false;

    expect(caughtError).not.toBeNull();
    const stack: string = caughtError.stack || "";

    // Only check if long stacks were actually triggered (separator present)
    expect(stack.includes("From previous event:")).toBe(true);

    const lines = stack.split("\n");
    const emptyLines = lines.filter((l: string) => l === "");
    
    // Original: `&& line` filters out empty/falsy lines -> no empty lines
    // Mutated: `if (true)` keeps all lines including empty ones -> empty lines present
    expect(emptyLines.length).toBe(0);
  });
});