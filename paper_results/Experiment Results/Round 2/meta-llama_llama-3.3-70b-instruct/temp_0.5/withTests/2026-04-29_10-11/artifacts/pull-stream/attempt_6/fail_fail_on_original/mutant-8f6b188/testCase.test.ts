import { drain } from '../../../../sinks/drain.js';

describe('drain', () => {
  it('should call done with end when end is not true', () => {
    const done = jest.fn();
    const sink = drain(() => {}, done);
    const end = {};
    sink(end, () => {});
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(end);
  });

  it('should not call done with end when end is true in the original code', () => {
    const done = jest.fn();
    const sink = drain(() => {}, done);
    sink(true, () => {});
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(null);
  });

  it('should call done with end when end is true in the mutated code', () => {
    const done = jest.fn();
    const sink = drain(() => {}, done);
    sink(true, () => {});
    // This test will fail in the original code and pass in the mutated code
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(true);
  });
});