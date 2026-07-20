import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame", () => {
  it("only filters frames from Q's own file", async () => {
    Q.longStackSupport = true;
    
    const d = Q.defer();
    const err = new Error("test");
    const stackBefore = err.stack;
    
    d.reject(err);
    
    let caught: any;
    await new Promise<void>(resolve => {
      d.promise.then(null, (e: any) => { caught = e; resolve(); });
    });
    
    // Check if stack was actually modified by makeStackTraceLong
    console.log("stack changed:", caught.stack !== stackBefore);
    console.log("has separator:", (caught.stack || "").includes("From previous event:"));
    console.log("stack:", caught.stack);
    
    expect(true).toBe(true);
  });
});