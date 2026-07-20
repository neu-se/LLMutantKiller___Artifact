import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should pass when the original code is used and fail when the mutated code is used', () => {
    const op = (data: any) => false;
    const done = (err: any) => {
      if (err) {
        throw err;
      }
    };

    const read = (err: any, cb: (end: any, data: any) => void) => {
      if (err === true) {
        cb(true, null);
      } else {
        cb(null, 'data');
      }
    };

    const sink = drain(op, done);
    const abortSpy = jest.spyOn(sink, 'abort');
    sink(read);
    expect(abortSpy).toHaveBeenCalledTimes(1);
    expect(abortSpy).toHaveBeenCalledWith(true);
  });
});