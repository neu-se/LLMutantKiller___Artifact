import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame stack filtering", () => {
  it("should filter out node.js internal frames from long stack traces", async () => {
    Q.longStackSupport = true;

    // Create a deferred whose promise has a stack containing a node.js internal frame
    const deferred = Q.defer();
    const nodeJsFrame = "    at Object.<anonymous> (node.js:10:5)";
    const userFrame = "    at userCode (app.js:1:1)";

    // Manually set the stack on the promise to include a node.js internal frame
    (deferred.promise as any).stack = `Error\n${userFrame}\n${nodeJsFrame}`;
    (deferred.promise as any).stackCounter = 999999; // large so it gets included

    // Create an error whose stack will be augmented by makeStackTraceLong
    const err = new Error("test error");
    (err as any).stack = `Error: test error\n${userFrame}`;

    deferred.reject(err);

    let caughtError: any;
    await new Promise<void>((resolve) => {
      deferred.promise.then(null, (e: any) => {
        caughtError = e;
        resolve();
      });
    });

    // With original code: isNodeFrame("    at Object.<anonymous> (node.js:10:5)") === true
    // so that line gets filtered OUT of the concatenated stack
    // With mutated code: isNodeFrame always returns false, so the node.js line is NOT filtered
    // and remains in the stack
    expect(caughtError.stack).not.toContain("node.js:10");
  });
});