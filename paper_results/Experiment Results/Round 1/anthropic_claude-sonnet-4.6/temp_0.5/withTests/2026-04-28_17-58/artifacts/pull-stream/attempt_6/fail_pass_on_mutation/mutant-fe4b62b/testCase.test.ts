import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain.abort", () => {
  it("sets abort to true and calls read with true when abort called with a callback", (done) => {
    const readCallArgs: any[] = [];

    function source(end: any, cb: (end: any, data?: any) => void) {
      readCallArgs.push(end);
      if (end) {
        cb(end);
      } else {
        // hang
      }
    }

    const sink = drain(
      function op() {},
      function onDone(err: any) {
        // Verify the source was called with true (not false)
        const abortCall = readCallArgs.find(v => v !== null && v !== undefined && v !== false);
        expect(abortCall).toBe(true);
        done();
      }
    );

    sink(source);

    sink.abort(function(err: any) {
      expect(err).toBe(true);
      done();
    });
  });
});