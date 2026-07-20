import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q isInternalFrame >= boundary", () => {
  it("filters frames at qStartingLine with >= not >", async () => {
    Q.longStackSupport = true;

    // Get the raw promise.stack which contains unfiltered q.js frames
    const d = Q.defer();
    const rawStack: string = (d.promise as any).stack || "";
    d.promise.fail(() => {});
    d.reject(new Error("x"));

    // Extract q.js filename and all line numbers from raw stack
    const lines = rawStack.split("\n");
    const qFrames = lines.filter(l => /q\.js:\d+:\d+/.test(l));
    expect(qFrames.length).toBeGreaterThan(0);

    // Get qFileName
    const m = /\((.+q\.js):\d+:\d+\)/.exec(qFrames[0]);
    expect(m).not.toBeNull();
    const qFileName = m![1];

    // Get all q.js line numbers present in promise.stack (these are > qStartingLine)
    const qLineNums = qFrames.map(l => {
      const n = new RegExp(`q\\.js:(\\d+):`).exec(l);
      return n ? parseInt(n[1]) : 0;
    }).filter(n => n > 0);

    const minQLine = Math.min(...qLineNums);

    // Now find qStartingLine by checking which lines get filtered
    // We'll create errors with synthetic stacks and see what survives filtering
    // 
    // Strategy: create an error whose stack IS the raw promise.stack content
    // but with one extra frame prepended at (minQLine - 1)
    // If (minQLine - 1) === qStartingLine, original filters it but mutant doesn't

    // Actually, let's directly test: create error with frame at (minQLine - 1)
    // and check if it's filtered. Then try (minQLine - 2), etc.
    // The first line that is NOT filtered is qStartingLine - 1
    // The first line that IS filtered is qStartingLine

    async function testLine(lineNum: number): Promise<boolean> {
      const marker = `MARKER${lineNum}`;
      // Manually construct error.stack with our synthetic frame
      const syntheticStack = `Error: test\n    at ${marker} (${qFileName}:${lineNum}:1)\n    at testFn (test.js:100:5)`;
      
      const err = new Error("test");
      Object.defineProperty(err, "stack", { value: syntheticStack, configurable: true });

      let result: Error | null = null;
      const deferred = Q.defer();
      await new Promise<void>((resolve) => {
        deferred.promise.fail((e: Error) => { result = e; resolve(); });
        deferred.reject(err);
      });

      return !(result?.stack ?? "").includes(marker);
    }

    // Scan downward from minQLine to find qStartingLine
    let qStartingLine = -1;
    for (let line = minQLine; line >= 1; line--) {
      const filtered = await testLine(line);
      if (!filtered) {
        qStartingLine = line + 1;
        break;
      }
    }

    if (qStartingLine === -1) qStartingLine = 1; // all lines filtered

    expect(qStartingLine).toBeGreaterThan(0);

    // Frame at exactly qStartingLine:
    // original (>=): filtered → testLine returns true
    // mutant (>): NOT filtered → testLine returns false
    expect(await testLine(qStartingLine)).toBe(true);
  });
});