import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should call done with null when end is an error object that is not true', () => {
    const done = jest.fn();
    const read = (abort: any, cb: any) => {
      cb({ message: 'error' }, null);
    };
    drain(() => {}, done)(read);
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith({ message: 'error' });
  });
});