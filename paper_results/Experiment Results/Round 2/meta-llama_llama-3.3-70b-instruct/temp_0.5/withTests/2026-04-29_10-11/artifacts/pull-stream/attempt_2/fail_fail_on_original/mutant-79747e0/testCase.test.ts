import { drain } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should call done callback when end is true', () => {
    const done = jest.fn();
    const sink = drain(() => {}, done);
    sink(null, () => {});
    sink(true, () => {});
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(null);
  });

  it('should call done callback when end is not true and done is provided', () => {
    const done = jest.fn();
    const sink = drain(() => {}, done);
    sink(null, () => {});
    sink(false, () => {});
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(false);
  });
});