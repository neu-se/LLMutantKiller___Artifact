import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should call done with error when end is not true', () => {
    const done = jest.fn();
    const sink = drain(() => {}, done);
    sink(null, (end, data) => {
      sink({ foo: 'bar' }, () => {
        expect(done).toHaveBeenCalledTimes(1);
        expect(done).toHaveBeenCalledWith({ foo: 'bar' });
      });
    });
  });
});