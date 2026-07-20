import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should call done with error when end is an error', () => {
    const done = jest.fn();
    const read = (abort: any, cb: any) => {
      cb(new Error('test error'));
    };
    drain(() => {}, done)(read);
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(new Error('test error'));
  });
});