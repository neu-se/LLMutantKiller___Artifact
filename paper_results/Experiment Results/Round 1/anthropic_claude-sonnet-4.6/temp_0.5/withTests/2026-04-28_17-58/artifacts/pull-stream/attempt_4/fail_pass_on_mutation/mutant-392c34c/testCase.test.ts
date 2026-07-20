import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find sink", () => {
  it("should receive null error (not true) in callback when no item matches and stream ends normally", (done) => {
    // Directly construct a source that immediately signals end with `true`
    // This bypasses any transformation drain might do
    function source(abort: any, cb: (end: any, data?: any) => void) {
      // Immediately end the stream with `true` (pull-stream normal end convention)
      cb(true);
    }

    const receivedArgs: any[] = [];

    const sink = find(
      (d: any) => false, // never matches
      (err: any, data: any) => {
        receivedArgs.push(err, data);
        // Original: err===true ? null : err => null
        // Mutated:  err===false ? null : err => true  (true!==false so passes true)
        expect(err).toStrictEqual(null);
        expect(data).toStrictEqual(null);
        done();
      }
    );

    sink(source);
  });
});