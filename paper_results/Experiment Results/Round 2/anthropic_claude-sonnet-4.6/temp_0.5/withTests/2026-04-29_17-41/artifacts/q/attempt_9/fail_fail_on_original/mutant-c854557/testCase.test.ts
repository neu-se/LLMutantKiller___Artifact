import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack trace filtering", () => {
  it("filters anonymous Q.js frames with multi-digit line numbers from actual stack traces", async () => {
    Q.longStackSupport = true;

    try {
      // First, capture the unfiltered stack to find real anonymous Q.js frames
      // by disabling long stack support temporarily to get raw stack
      Q.longStackSupport = false;
      let rawStack = "";
      await Q.when(Q.resolve(1), function() {
        throw new Error("raw");
      }, undefined).then(undefined, function(e: any) {
        rawStack = e.stack || "";
      });
      Q.longStackSupport = true;

      // Find anonymous Q.js frames in the raw stack (format: "at PATH:LINE:COL" no parens)
      const rawLines = rawStack.split("\n");
      const anonymousQFrames = rawLines.filter(line => {
        const t = line.trim();
        return t.startsWith("at ") && !t.includes("(") && /q\.js:\d{2,}:\d+$/.test(t);
      });

      // Now get the filtered stack with long stack support
      let filteredStack = "";
      await Q.when(Q.resolve(1), function() {
        throw new Error("filtered");
      }, undefined).then(undefined, function(e: any) {
        filteredStack = e.stack || "";
      });

      expect(filteredStack).toContain("From previous event:");

      // Any anonymous Q.js frames that were in the raw stack should be filtered out
      // Original (\d+): correctly parses multi-digit line numbers → filtered
      // Mutated (\d): fails to parse multi-digit line numbers correctly → NOT filtered
      for (const frame of anonymousQFrames) {
        expect(filteredStack).not.toContain(frame.trim());
      }

      // Ensure we actually tested something meaningful
      expect(anonymousQFrames.length).toBeGreaterThan(0);
    } finally {
      Q.longStackSupport = false;
    }
  });
});