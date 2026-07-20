import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deprecate function", () => {
  it("should call console.warn with deprecation message when calling a deprecated function", () => {
    const originalWarn = console.warn;
    let warnCalled = false;
    let warnMessage = "";

    console.warn = (msg: string) => {
      warnCalled = true;
      warnMessage = msg;
    };

    try {
      // Q.allResolved is deprecated in favor of Q.allSettled
      // Calling it should trigger console.warn in the original code
      Q.allResolved([Q(1), Q(2)]);
    } finally {
      console.warn = originalWarn;
    }

    expect(warnCalled).toBe(true);
    expect(warnMessage).toContain("allResolved");
    expect(warnMessage).toContain("allSettled");
  });
});