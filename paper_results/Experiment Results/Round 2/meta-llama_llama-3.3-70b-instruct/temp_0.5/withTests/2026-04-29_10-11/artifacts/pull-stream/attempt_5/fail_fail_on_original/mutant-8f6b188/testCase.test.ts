import { drain } from '../../../sinks/drain';

describe('drain', () => {
  it('should call done when end is not true', () => {
    const done = jest.fn();
    const sink = drain(() => {}, done);
    const end = 'not true';
    sink(end, () => {});
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(end);
  });

  it('should not call done when end is true in the original code', () => {
    const done = jest.fn();
    const sink = drain(() => {}, done);
    sink(true, () => {});
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(null);
  });
});