import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should throw error when done callback is missing and end is truthy but not true', () => {
    const error = new Error('test error');
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      cb(error);
    };

    const sink = drain(null);

    expect(() => {
      sink(source);
    }).toThrow(error);
  });
});