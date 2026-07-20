import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should not call done callback when it is not provided', () => {
    const done = jest.fn();
    const read = jest.fn((err: any, cb: any) => {
      cb(true, null);
    });

    const sink = drain(null);
    sink(read);

    expect(done).not.toHaveBeenCalled();
  });
});