import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should not call done with non-error end when end is not true', () => {
    const done = jest.fn();
    const read = (abort: any, cb: any) => {
      cb({ foo: 'bar' }, null);
    };
    drain(() => {}, done)(read);
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith({ foo: 'bar' });
    expect(done).not.toHaveBeenCalledWith(null);
  });
});