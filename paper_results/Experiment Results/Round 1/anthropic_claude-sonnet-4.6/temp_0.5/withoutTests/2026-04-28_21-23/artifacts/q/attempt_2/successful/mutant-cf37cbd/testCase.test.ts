import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q stack trace filtering of anonymous frames", () => {
  it("filters anonymous Q frames with multi-digit column numbers from long stack traces", async () => {
    Q.longStackSupport = true;

    const qPath = require.resolve(
      "../../../../../../../../../../../subject_repositories/q/q.js"
    );

    // Create an error with a custom stack that includes an anonymous Q frame
    // with a multi-digit column number (15 >= 10)
    const err = new Error("test error");
    const anonymousQFrame = `    at ${qPath}:500:15`;
    err.stack = `Error: test error\n${anonymousQFrame}\n    at Object.<anonymous> (/some/other/file.js:10:5)`;

    const deferred = Q.defer<void>();
    const chain = deferred.promise.then(() => {
      throw err;
    });
    deferred.resolve();

    let caughtError: Error | null = null;
    await chain.then(null, (e: Error) => {
      caughtError = e;
    });

    Q.longStackSupport = false;

    expect(caughtError).not.toBeNull();
    const stack = caughtError!.stack || "";

    // In the original: attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/
    //   Parses "at /path/to/q.js:500:15" -> ['/path/to/q.js', 500]
    //   isInternalFrame returns true -> frame is FILTERED OUT
    //   stack does NOT contain the anonymous Q frame
    //
    // In the mutated version: attempt2 = /at ([^ ]+):(\d+):(?:\d)$/
    //   Fails to parse "at /path/to/q.js:500:15" (column 15 has 2 digits)
    //   isInternalFrame returns false -> frame is NOT filtered
    //   stack DOES contain the anonymous Q frame
    expect(stack).not.toContain(`${qPath}:500:15`);
  });
});