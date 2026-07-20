import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should not call done with end when end is true', () => {
    const done = jest.fn();
    const read = (abort: any, cb: any) => {
      cb(true, null);
    };
    drain(() => {}, done)(read);
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(null);
    expect(done).not.toHaveBeenCalledWith(true);
  });
});