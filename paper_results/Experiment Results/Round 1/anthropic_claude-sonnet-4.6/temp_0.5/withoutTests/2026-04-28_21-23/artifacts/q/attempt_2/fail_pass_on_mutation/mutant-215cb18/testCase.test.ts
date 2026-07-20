import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_defineProperty", () => {
  it("sets stack property via makeStackTraceLong with long stack support", async () => {
    Q.longStackSupport = true;
    
    const deferred = Q.defer();
    const error = new Error("original");
    
    // Create a chain to trigger makeStackTraceLong
    const p = deferred.promise.then(() => { throw error; });
    deferred.resolve(1);
    
    let caughtStack: string | undefined;
    await p.fail((e: any) => { caughtStack = e.stack; return null; });
    
    expect(typeof caughtStack).toBe("string");
    Q.longStackSupport = false;
  });
});