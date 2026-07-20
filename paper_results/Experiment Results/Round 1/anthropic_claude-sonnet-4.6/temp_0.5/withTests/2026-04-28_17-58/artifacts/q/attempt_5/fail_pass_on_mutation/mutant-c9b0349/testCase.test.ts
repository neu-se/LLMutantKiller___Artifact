import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

function MARKER_FUNCTION(d: { reject: (reason: any) => void }) {
  d.reject(new Error("from MARKER_FUNCTION"));
}

describe("isInternalFrame lower bound", () => {
  it("preserves user frames at line numbers below qStartingLine", () => {
    Q.longStackSupport = true;
    const d = Q.defer();
    const p = d.promise.then(null, (err: Error) => {
      Q.longStackSupport = false;
      expect(err.stack).toContain("MARKER_FUNCTION");
    });
    MARKER_FUNCTION(d);
    return p;
  });
});