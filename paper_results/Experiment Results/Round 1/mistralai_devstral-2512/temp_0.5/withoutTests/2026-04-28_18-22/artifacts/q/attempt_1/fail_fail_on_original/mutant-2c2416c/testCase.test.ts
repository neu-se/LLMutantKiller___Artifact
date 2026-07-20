// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-2c2416c/testCase.test.ts
import { Q } from "./q.js";

describe("Q deprecation warning", () => {
  it("should include the alternative in the deprecation warning message", () => {
    const originalWarn = console.warn;
    const warnMessages: string[] = [];
    console.warn = (...args: any[]) => {
      warnMessages.push(args.join(" "));
    };

    try {
      // Trigger a deprecation warning by calling a deprecated method
      Q.allResolved([]);
      expect(warnMessages.length).toBeGreaterThan(0);
      const warningMessage = warnMessages[0];
      expect(warningMessage).toContain("allSettled");
      expect(warningMessage).toContain("instead.");
    } finally {
      console.warn = originalWarn;
    }
  });
});