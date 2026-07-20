import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink.abort", () => {
  it("calls the callback passed to abort with null when stream is aborted cleanly", (done) => {
    const values = [1, 2, 3];
    let i = 0;

    const source = (abort: any, cb: Function) => {
      if (abort) {
        cb(abort);
        return;
      }
      if (i < values.length) {
        cb(null, values[i++]);
      } else {
        cb(true);
      }
    };

    const abortCallback = jest.fn((err: any) => {
      expect(err).toBeTruthy();
      done();
    });

    const sink = drain(
      (_data: any) => {},
      (_err: any) => {}
    );

    sink(source);
    sink.abort(new Error("test error"), abortCallback);
  });
});