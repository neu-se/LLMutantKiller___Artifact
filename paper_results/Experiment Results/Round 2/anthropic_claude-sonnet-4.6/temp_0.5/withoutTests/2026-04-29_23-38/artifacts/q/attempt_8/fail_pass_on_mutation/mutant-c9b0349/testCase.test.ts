import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("test", () => {
    Q.longStackSupport = true;
    const d = Q.defer();
    let capturedErr: any;
    const err = new Error("x");
    // Capture original stack before makeStackTraceLong might modify it
    const stackBefore = err.stack;
    const p = d.promise
      .then(() => { throw err; })
      .fail((e: any) => { capturedErr = e; })
      .then(() => {
        // makeStackTraceLong should have modified the stack
        expect(capturedErr.stack).not.toBe(stackBefore);
        // now check content
        expect(capturedErr.stack).toContain("From previous event:");
      });
    d.resolve();
    return p;
  });
});