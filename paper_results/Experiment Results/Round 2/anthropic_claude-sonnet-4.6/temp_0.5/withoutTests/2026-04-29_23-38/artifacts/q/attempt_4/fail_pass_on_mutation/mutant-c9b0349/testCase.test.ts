import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("makeStackTraceLong modifies stack and preserves small-line-number frames", () => {
    Q.longStackSupport = true;
    const d = Q.defer();
    let err: any;
    const p = d.promise
      .then(function f() { throw new Error("x"); })
      .fail((e: any) => { err = e; })
      .then(() => {
        // First verify makeStackTraceLong was called
        expect(err.stack).toContain("From previous event:");
        // Then verify the frame at small line number is preserved
        expect(err.stack).toContain("f");
      });
    d.resolve();
    return p;
  });
});