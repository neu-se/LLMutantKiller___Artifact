import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Firefox-style stack frame parsing", () => {
  it("correctly filters Firefox-style internal frames from long stack traces", async () => {
    Q.longStackSupport = true;

    try {
      let qFileName: string | null = null;
      try { throw new Error(); } catch (e) {
        for (const line of ((e as Error).stack || "").split("\n")) {
          const m = /\((.+[/\\]q\.js):\d+:\d+\)/.exec(line);
          if (m) { qFileName = m[1]; break; }
        }
      }
      if (!qFileName) throw new Error("Cannot find q.js filename");

      // Create a rejected promise
      const rejectedPromise = Q.reject(new Error("original error"));
      
      // Manually set a Firefox-style stack on this promise
      // that references Q's own file at a line that's within Q's range
      const marker = "firefoxInternalFrame";
      (rejectedPromise as any).stack = `${marker}@${qFileName}:500`;
      (rejectedPromise as any).stackCounter = 0;

      // Now chain .fail() - this calls _rejected which calls makeStackTraceLong(error, self)
      // where self = rejectedPromise (which has our Firefox-style stack)
      let finalStack = "";
      await rejectedPromise.fail((e: Error) => {
        finalStack = e.stack || "";
        return "handled";
      });

      // Original \d+: "500" matches attempt3, isInternalFrame returns true, frame filtered
      // Mutated \D+: "500" doesn't match, isInternalFrame returns false, frame stays
      expect(finalStack).not.toContain(marker);
    } finally {
      Q.longStackSupport = false;
    }
  });
});