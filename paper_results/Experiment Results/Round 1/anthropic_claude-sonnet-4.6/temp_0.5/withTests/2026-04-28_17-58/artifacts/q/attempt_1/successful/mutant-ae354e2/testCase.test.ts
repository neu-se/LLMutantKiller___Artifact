import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deprecate function warning message", () => {
  it("should include 'is deprecated, use' in the console.warn message when calling a deprecated function", () => {
    const warnMessages: string[] = [];
    const originalWarn = console.warn;
    console.warn = (...args: any[]) => {
      warnMessages.push(args.join(" "));
    };

    try {
      // allResolved is wrapped with deprecate("allResolved", "allSettled")
      // Calling it should trigger console.warn with the deprecation message
      (Q as any).allResolved([Q.resolve(1)]);
    } finally {
      console.warn = originalWarn;
    }

    expect(warnMessages.length).toBeGreaterThan(0);
    // Original: "allResolved is deprecated, use allSettled..."
    // Mutated:  "allResolvedallSettled..." (no " is deprecated, use ")
    expect(warnMessages[0]).toContain("is deprecated, use");
  });
});