import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deprecate function guards console.warn call", () => {
  it("should not throw when console.warn is null and a deprecated method is called", async () => {
    const originalWarn = console.warn;
    
    // @ts-ignore
    console.warn = null;
    
    try {
      await expect(
        Q.allResolved([Q(1), Q(2)])
      ).resolves.toBeDefined();
    } finally {
      console.warn = originalWarn;
    }
  });
});