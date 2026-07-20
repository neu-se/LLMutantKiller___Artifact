import { drain } from '../../../sinks/drain.js';

describe('drain', () => {
  it('should call done callback when end is true', () => {
    const done = jest.fn();
    const sink = drain(() => {}, done);
    sink(null, () => {});
    sink(true, () => {});
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(null);
  });

  it('should not call done callback when end is not true', () => {
    const done = jest.fn();
    const sink = drain(() => {}, done);
    sink(null, () => {});
    sink(false, () => {});
    expect(done).not.toHaveBeenCalled();
  });
});