import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should call done with null when end is true and not an error', () => {
    const done = jest.fn();
    const read = (abort: any, cb: any) => {
      cb(true, null);
    };
    drain(() => {}, done)(read);
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(null);
  });
});