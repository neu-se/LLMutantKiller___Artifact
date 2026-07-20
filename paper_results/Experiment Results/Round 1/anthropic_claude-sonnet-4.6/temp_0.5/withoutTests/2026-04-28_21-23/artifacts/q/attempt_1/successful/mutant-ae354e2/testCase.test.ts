import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deprecate function warning message", () => {
  it("should include 'is deprecated, use' in the console.warn message when calling deprecated allResolved", () => {
    const warnMessages: string[] = [];
    const originalWarn = console.warn;
    console.warn = (msg: string) => {
      warnMessages.push(msg);
    };

    try {
      // allResolved is wrapped with deprecate(), calling it should trigger the warning
      Q.allResolved([Q(1), Q(2)]);
    } finally {
      console.warn = originalWarn;
    }

    expect(warnMessages.length).toBeGreaterThan(0);
    expect(warnMessages[0]).toContain("is deprecated, use");
  });
});