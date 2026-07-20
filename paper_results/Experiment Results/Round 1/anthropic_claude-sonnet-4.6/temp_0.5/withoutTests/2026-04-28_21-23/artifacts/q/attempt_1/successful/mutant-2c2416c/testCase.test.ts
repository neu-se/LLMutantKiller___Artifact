import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deprecate function warning message", () => {
  it("should include ' instead.' in the deprecation warning message", () => {
    const warnMessages: string[] = [];
    const originalWarn = console.warn;
    console.warn = (...args: any[]) => {
      warnMessages.push(args.join(" "));
    };

    try {
      // Q.allResolved is deprecated and uses the deprecate() function
      // which should produce a warning containing " instead."
      Q.allResolved([Q.resolve(1)]);
    } finally {
      console.warn = originalWarn;
    }

    expect(warnMessages.length).toBeGreaterThan(0);
    const warningMessage = warnMessages[0];
    expect(warningMessage).toContain(" instead.");
  });
});