describe("object_defineProperty fallback", () => {
  it("sets stack property on error via fallback when Object.defineProperty unavailable", async () => {
    const savedDefineProperty = Object.defineProperty;
    // @ts-ignore
    Object.defineProperty = undefined;

    let Q: any;
    jest.isolateModules(() => {
      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    });

    Object.defineProperty = savedDefineProperty;

    Q.longStackSupport = true;

    // Create a promise chain that will trigger makeStackTraceLong
    const deferred = Q.defer();
    
    const error = new Error("test error");
    // Capture the original stack
    const originalStack = error.stack;
    
    const p = deferred.promise.then(() => {
      throw error;
    });
    deferred.resolve(1);

    let caught: any;
    await p.fail((e: any) => {
      caught = e;
      return null;
    });

    // With original fallback: error.stack was set to a new filtered/concatenated value
    // With mutant fallback: error.stack remains as originalStack
    expect(caught.stack).not.toBe(originalStack);
  });
});