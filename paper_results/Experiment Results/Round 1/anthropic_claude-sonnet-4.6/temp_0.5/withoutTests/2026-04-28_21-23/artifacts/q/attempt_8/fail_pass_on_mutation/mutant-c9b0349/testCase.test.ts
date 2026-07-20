import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q isInternalFrame fileName check", () => {
  it("only filters frames from q.js, not from other files", async () => {
    Q.longStackSupport = true;

    try {
      // Step 1: Get qFileName and a line number from q.js
      const probe = Q.defer();
      const rawStack: string = (probe.promise as any).stack || "";
      probe.resolve(null);

      if (!rawStack) return; // No stack support

      // Extract a q.js frame to get the filename and a line number
      const lines = rawStack.split("\n");
      let qFileName: string | null = null;
      let qLineNumber: number | null = null;

      for (const line of lines) {
        const m = line.match(/at .+ \((.+):(\d+):\d+\)$/) ||
                  line.match(/at ([^ ]+):(\d+):\d+$/);
        if (m && !m[1].includes("node_modules") && !m[1].includes("internal/")) {
          qFileName = m[1];
          qLineNumber = parseInt(m[2]);
          break;
        }
      }

      if (!qFileName || !qLineNumber) return; // Can't parse

      // Step 2: Create a deferred with a fake stack containing a frame from
      // a DIFFERENT file at the SAME line number as a q.js frame
      const fakeFileName = "/completely/different/path/not-q.js";
      const deferred = Q.defer();
      (deferred.promise as any).stack = `    at Object.<anonymous> (${fakeFileName}:${qLineNumber}:10)`;
      (deferred.promise as any).stackCounter = 1;

      const error = new Error("test");
      deferred.reject(error);

      const caught = await deferred.promise.then(null, (e: Error) => e);

      // Original: fileName === qFileName → fakeFileName !== qFileName → NOT filtered
      // Mutated: no fileName check → qLineNumber in [qStartingLine, qEndingLine] → IS filtered
      expect(caught.stack).toContain("not-q.js");
    } finally {
      Q.longStackSupport = false;
    }
  });
});