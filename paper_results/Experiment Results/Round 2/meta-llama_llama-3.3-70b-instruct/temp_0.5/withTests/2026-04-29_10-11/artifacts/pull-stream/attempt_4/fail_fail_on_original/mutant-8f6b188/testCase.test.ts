import { drain } from '../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should call done with end when end is true and end is not true', () => {
    const done = jest.fn();
    const sink = drain(() => {}, done);
    const end = {};
    sink(end, () => {});
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(end);
  });

  it('should not call done with end when end is true and end is true', () => {
    const done = jest.fn();
    const sink = drain(() => {}, done);
    sink(true, () => {});
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(null);
  });

  it('should call done with end when end is an error', () => {
    const done = jest.fn();
    const sink = drain(() => {}, done);
    const error = new Error('Test error');
    sink(error, () => {});
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(error);
  });
});