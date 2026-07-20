import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deprecate function warning message", () => {
  it("should include ' instead.' in the deprecation warning when calling allResolved", () => {
    const warnMessages: string[] = [];
    const originalWarn = console.warn;
    console.warn = (...args: any[]) => {
      warnMessages.push(args[0]);
    };

    try {
      // allResolved is wrapped with deprecate("allResolved", "allSettled")
      // This should trigger a console.warn with a message containing " instead."
      Q.allResolved([Q(1), Q(2)]);
    } finally {
      console.warn = originalWarn;
    }

    expect(warnMessages.length).toBeGreaterThan(0);
    expect(warnMessages[0]).toContain(" instead.");
  });
});