import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deprecate function", () => {
  it("should call console.warn with deprecation message when calling a deprecated function", () => {
    const originalWarn = console.warn;
    const warnMessages: string[] = [];
    
    console.warn = (...args: any[]) => {
      warnMessages.push(args[0]);
    };

    try {
      // Q.allResolved is decorated with deprecate("allResolved", "allSettled")
      // Calling it should trigger console.warn in the original code
      Q.allResolved([Q(1), Q(2)]);
    } finally {
      console.warn = originalWarn;
    }

    expect(warnMessages.length).toBeGreaterThan(0);
    expect(warnMessages[0]).toContain("allResolved");
    expect(warnMessages[0]).toContain("allSettled");
  });
});