import { drain } from '../../../../../sinks/drain';

describe('drain', () => {
  it('should call done with null when end is true', () => {
    const done = jest.fn();
    const sink = drain(() => true, done);
    sink(null, (end, data) => {
      expect(end).toBe(true);
      expect(done).toHaveBeenCalledTimes(1);
      expect(done).toHaveBeenCalledWith(null);
    });
  });
});