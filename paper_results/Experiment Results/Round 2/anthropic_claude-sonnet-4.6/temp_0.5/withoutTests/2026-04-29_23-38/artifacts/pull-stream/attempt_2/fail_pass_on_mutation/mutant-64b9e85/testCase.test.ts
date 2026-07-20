import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find sink", () => {
  it("should call callback with null as first argument when no match is found and stream ends normally", (done) => {
    // A pull-stream source that immediately ends (true = normal end in pull-stream)
    function immediatelyEndingSource(end: any, cb: Function) {
      cb(true);
    }

    find(
      (data: any) => data === "never",
      (err: any, data: any) => {
        // Original: err===true ? null : err => null
        // Mutated:  false ? null : err => true (NOT null)
        expect(err).toBeNull();
        done();
      }
    )(immediatelyEndingSource);
  });
});