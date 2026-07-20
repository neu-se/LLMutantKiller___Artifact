import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q isInternalFrame >= boundary", () => {
  it("should filter frame at qStartingLine (line 91) using >= not >", async () => {
    Q.longStackSupport = true;

    // Get q.js filename
    const probe = Q.defer();
    const rawStack: string = (probe.promise as any).stack || "";
    probe.promise.fail(() => {});
    probe.reject(new Error("x"));

    const qFileMatch = /\((.+q\.js):\d+:\d+\)/.exec(rawStack);
    expect(qFileMatch).not.toBeNull();
    const qFileName = qFileMatch![1];

    async function isFrameFiltered(lineNum: number): Promise<boolean> {
      const marker = `M${lineNum}`;
      const err = new Error("test");
      Object.defineProperty(err, "stack", {
        value: `Error: test\n    at ${marker} (${qFileName}:${lineNum}:1)\n    at t (t.js:1:1)`,
        configurable: true,
        writable: true
      });

      let out: Error | null = null;
      const d = Q.defer();
      await new Promise<void>((resolve) => {
        d.promise.fail((e: Error) => { out = e; resolve(); });
        d.reject(err);
      });
      return !(out?.stack ?? "").includes(marker);
    }

    // qStartingLine = 91 (line of "var qStartingLine = captureLine();" in q.js)
    // Original (>=): 91 >= 91 → filtered → isFrameFiltered(91) returns true
    // Mutant (>): 91 > 91 → false → NOT filtered → isFrameFiltered(91) returns false
    expect(await isFrameFiltered(91)).toBe(true);
    
    // Sanity check: line 90 should NOT be filtered (it's before Q's code)
    expect(await isFrameFiltered(90)).toBe(false);
    
    // Sanity check: line 92 should be filtered (it's inside Q's code)
    expect(await isFrameFiltered(92)).toBe(true);
  });
});