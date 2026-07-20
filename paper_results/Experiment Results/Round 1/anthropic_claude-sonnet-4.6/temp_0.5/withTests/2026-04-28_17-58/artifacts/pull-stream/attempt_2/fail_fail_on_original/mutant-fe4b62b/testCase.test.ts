import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain.abort called before source is connected", () => {
  it("should abort the stream immediately when sink is connected after abort(callback) was called", (done) => {
    let sourceReadCount = 0;

    function countingSource(end: any, cb: (end: any, data?: any) => void) {
      if (end) {
        cb(end);
        return;
      }
      sourceReadCount++;
      // Return data synchronously
      cb(null, sourceReadCount);
    }

    const sink = drain(
      function op(data: any) {
        // If stream is not aborted, op will be called with data
      },
      function onDone(err: any) {
        // With original: abort was set to true before connecting,
        // so sink(source) triggers immediate abort, onDone called with null (true -> null)
        // sourceReadCount should be 0 since we aborted before any reads
        expect(sourceReadCount).toBe(0);
        done();
      }
    );

    // Abort before connecting source - original: abort=true, mutant: abort=false
    sink.abort(function() {});

    // Now connect source - original: if(abort) triggers abort path immediately
    // mutant: abort=false so if(abort) is falsy, proceeds to read normally
    sink(countingSource);
  });
});