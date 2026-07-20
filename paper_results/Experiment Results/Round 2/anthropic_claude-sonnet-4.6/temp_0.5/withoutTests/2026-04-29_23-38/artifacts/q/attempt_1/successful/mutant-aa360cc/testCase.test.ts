import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deprecate function", () => {
  it("should call console.warn when a deprecated function is used", async () => {
    const originalWarn = console.warn;
    const warnCalls: any[][] = [];
    
    console.warn = (...args: any[]) => {
      warnCalls.push(args);
    };
    
    try {
      // Q.allResolved is wrapped with deprecate("allResolved", "allSettled")
      await Q.allResolved([Q(1), Q(2)]);
    } finally {
      console.warn = originalWarn;
    }
    
    expect(warnCalls.length).toBeGreaterThan(0);
    expect(warnCalls[0][0]).toContain("allResolved");
    expect(warnCalls[0][0]).toContain("allSettled");
  });
});