import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deprecate function warning message", () => {
  it("should include ' instead.' in the deprecation warning message", () => {
    const warnMessages: string[] = [];
    const originalWarn = console.warn;
    console.warn = (...args: any[]) => {
      warnMessages.push(args[0]);
    };

    try {
      // Q.allResolved is wrapped with deprecate("allResolved", "allSettled")
      // This should trigger a console.warn with the deprecation message
      Q.allResolved([Q.resolve(1)]);
    } finally {
      console.warn = originalWarn;
    }

    expect(warnMessages.length).toBeGreaterThan(0);
    // Original: name + "" + alternative + " instead."
    // Mutated:  name + "" + alternative + ""
    expect(warnMessages[0]).toContain(" instead.");
  });
});