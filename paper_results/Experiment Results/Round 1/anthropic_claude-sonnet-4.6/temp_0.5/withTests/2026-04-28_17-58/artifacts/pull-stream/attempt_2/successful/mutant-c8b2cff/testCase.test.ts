import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain abort signal propagation", () => {
  it("should pass the specific abort error to the source when abort is set and op returns false", (done) => {
    const specificError = new Error("specific abort error");
    let abortSignalReceived: any = undefined;
    let dataCount = 0;

    const sink = drain(
      function op(_data: any) {
        // On first data item, set abort then return false
        // This means abort is now set when read(abort||true, ...) is called
        if (dataCount === 0) {
          dataCount++;
          sink.abort(specificError);
          return false;
        }
        return true;
      },
      function doneCb(_err: any) {
        expect(abortSignalReceived).toBe(specificError);
        done();
      }
    );

    function source(abort: any, cb: (end: any, data?: any) => void) {
      if (abort) {
        abortSignalReceived = abort;
        cb(abort);
        return;
      }
      cb(null, 42);
    }

    sink(source);
  });
});