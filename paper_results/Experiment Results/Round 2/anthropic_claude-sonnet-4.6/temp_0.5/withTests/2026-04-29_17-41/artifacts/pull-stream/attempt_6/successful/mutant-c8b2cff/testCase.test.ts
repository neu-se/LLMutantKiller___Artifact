import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain", () => {
  it("passes abort error object to done when op returns false with abort set to custom error", () => {
    const customError = new Error("custom abort error");
    let sinkRef: any;
    let firstAbortSeen = false;
    const doneMock = jest.fn();

    function source(abort: any, cb: (end: any, data?: any) => void) {
      if (abort) {
        if (!firstAbortSeen) {
          firstAbortSeen = true;
          return; // ignore first abort (from sink.abort inside op)
        }
        cb(abort); // echo second abort (from else-if branch) -> calls done(abort)
        return;
      }
      cb(null, 1);
    }

    const sink = drain(
      (_data: any) => {
        sinkRef.abort(customError);
        return false;
      },
      doneMock
    );

    sinkRef = sink;
    sink(source);

    expect(doneMock).toHaveBeenCalledTimes(1);
    expect(doneMock).toHaveBeenCalledWith(customError);
  });
});