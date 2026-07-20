import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should call done with error when end is an error', () => {
    const done = jest.fn();
    const end = new Error('test error');
    const read = () => {};
    const sink = drain(() => {}, done);
    sink(read);
    sink(null, (err, data) => {
      if (err) throw err;
      sink(end, () => {});
    });
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(end);
  });
});