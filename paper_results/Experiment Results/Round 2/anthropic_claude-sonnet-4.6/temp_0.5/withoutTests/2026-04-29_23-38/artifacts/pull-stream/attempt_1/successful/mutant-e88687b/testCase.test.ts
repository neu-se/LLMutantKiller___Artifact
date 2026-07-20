import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink abort", () => {
  it("should call the callback passed as first argument to abort when it is a function", (done) => {
    let i = 0;
    const source = (end: any, cb: Function) => {
      if (end) {
        cb(end === true ? null : end);
        return;
      }
      cb(null, i++);
    };

    const callbackCalled = jest.fn();

    const sink = drain(
      (data: any) => {
        if (data === 2) {
          // Pass a function as first arg - original treats it as callback
          (sink as any).abort((err: any) => {
            callbackCalled(err);
            expect(err).toBeNull();
            done();
          });
        }
      },
      undefined
    );

    sink(source);
  });
});