import { drain } from '../../../sinks/drain.js';

describe('drain', () => {
  it('should not call done with true when end is true in the original code', () => {
    const done = jest.fn();
    const sink = drain(() => {}, done);
    sink(true, () => {});
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).not.toHaveBeenCalledWith(true);
  });

  it('should call done with null when end is true', () => {
    const done = jest.fn();
    const sink = drain(() => {}, done);
    sink(true, () => {});
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(null);
  });
});