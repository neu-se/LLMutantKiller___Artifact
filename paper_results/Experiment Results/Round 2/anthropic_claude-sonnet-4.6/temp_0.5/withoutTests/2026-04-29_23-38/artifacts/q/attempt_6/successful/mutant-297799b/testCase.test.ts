import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame mutation detection", () => {
  it("long stack trace should contain user code frames after filtering", async () => {
    Q.longStackSupport = true;

    const deferred = Q.defer();
    const chain = deferred.promise.then((): never => { throw new Error("test error"); });
    deferred.resolve(1);

    let caughtStack = "";
    await chain.then(null, (e: Error) => {
      caughtStack = e.stack || "";
    });

    // Original: filterStackString keeps !isInternalFrame && !isNodeFrame lines
    // -> user/test code lines are kept -> stack contains "From previous event"
    // Mutated: isNodeFrame always true -> !isNodeFrame always false -> nothing kept -> no separator
    expect(caughtStack).toContain("From previous event");
  });
});