import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain", () => {
  it("passes custom abort error to done callback when op returns false after setting abort to custom error", (done) => {
    const customError = new Error("custom abort error");
    const doneArgs: any[] = [];
    let sinkRef: any;
    let secondAbortCb: ((end: any) => void) | null = null;
    let secondAbortCallCount = 0;

    function source(abort: any, cb: (end: any, data?: any) => void) {
      if (abort) {
        secondAbortCallCount++;
        if (secondAbortCallCount === 2) {
          secondAbortCb = cb;
        }
        // Don't call cb immediately for abort calls
        return;
      }
      cb(null, 1);
    }

    const sink = drain(
      (_data: any) => {
        sinkRef.abort(customError);
        return false;
      },
      (err: any) => {
        doneArgs.push(err);
      }
    );

    sinkRef = sink;
    sink(source);

    // Trigger the second abort callback (from else-if branch)
    // This directly calls done with whatever abort value was passed
    if (secondAbortCb) {
      secondAbortCb(customError); // Pass customError to simulate source echoing
    }

    setImmediate(() => {
      expect(doneArgs.length).toBeGreaterThan(0);
      expect(doneArgs[0]).toBe(customError);
      done();
    });
  });
});