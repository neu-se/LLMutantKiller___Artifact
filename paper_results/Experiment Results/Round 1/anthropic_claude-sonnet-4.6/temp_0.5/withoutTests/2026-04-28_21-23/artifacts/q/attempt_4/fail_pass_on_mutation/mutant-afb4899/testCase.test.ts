import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("regex $ anchor in attempt2", () => {
  it("detects mutation via direct stack line parsing observable through isInternalFrame", async () => {
    Q.longStackSupport = true;
    
    const outerError = new Error("outer");
    // Force a long stack trace scenario
    const p1 = Q.reject(outerError);
    const p2 = p1.then(() => {});
    
    let caught: any = null;
    await p2.fail((e: any) => { caught = e; });
    
    expect(caught).toBe(outerError);
    // Stack should contain the STACK_JUMP_SEPARATOR if long stacks work
    expect(caught.stack).toContain("From previous event:");
    
    Q.longStackSupport = false;
  });
});