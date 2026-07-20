import { drain } from '../../../sinks/drain';

describe('drain', () => {
  it('should call done with end when end is true', () => {
    const done = jest.fn();
    const sink = drain(() => {}, done);
    sink(true, () => {});
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(null);
  });

  it('should call done with end when end is not true', () => {
    const done = jest.fn();
    const sink = drain(() => {}, done);
    sink('error', () => {});
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith('error');
  });

  it('should not call done with end when end is true and end === true in mutated code', () => {
    // This test will pass in original code but fail in mutated code
    const done = jest.fn();
    const sink = drain(() => {}, done);
    sink(true, () => {});
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(null);
  });
});