import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deprecate function warning message", () => {
  it("should include 'is deprecated, use' in the console warning when calling a deprecated function", () => {
    const warnMessages: string[] = [];
    const originalWarn = console.warn;
    console.warn = (...args: any[]) => {
      warnMessages.push(args.join(" "));
    };

    try {
      // Q.allResolved is wrapped with deprecate("allResolved", "allSettled")
      // Calling it should trigger console.warn with the deprecation message
      Q.allResolved([]);
    } finally {
      console.warn = originalWarn;
    }

    expect(warnMessages.length).toBeGreaterThan(0);
    // Original code produces: "allResolved is deprecated, use allSettled"
    // Mutated code produces: "allResolved allSettled" (missing " is deprecated, use ")
    expect(warnMessages[0]).toContain("is deprecated, use");
  });
});