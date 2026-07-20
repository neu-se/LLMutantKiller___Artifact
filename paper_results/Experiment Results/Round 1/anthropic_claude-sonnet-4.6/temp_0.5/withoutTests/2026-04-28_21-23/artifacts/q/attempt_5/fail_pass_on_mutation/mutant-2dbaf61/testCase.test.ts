describe("Q hasStacks initialization", () => {
  it("sets hasStacks based on whether thrown errors have stacks", () => {
    const originalPrepareStackTrace = (Error as any).prepareStackTrace;

    (Error as any).prepareStackTrace = () => "";

    let Q2: any;
    jest.isolateModules(() => {
      Q2 = require("../../../../../../../../../../../subject_repositories/q/q.js");
    });

    (Error as any).prepareStackTrace = originalPrepareStackTrace;

    Q2.longStackSupport = true;
    const deferred = Q2.defer();

    // Original: hasStacks = !!"" = false → promise.stack not set
    // Mutated: hasStacks = true → promise.stack IS set
    expect(deferred.promise.stack).toBeUndefined();
  });
});