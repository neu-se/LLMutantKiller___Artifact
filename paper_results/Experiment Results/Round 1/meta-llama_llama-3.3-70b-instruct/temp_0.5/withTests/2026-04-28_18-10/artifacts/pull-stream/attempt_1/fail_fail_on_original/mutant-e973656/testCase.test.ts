import { drain } from '../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should handle end condition correctly', () => {
    const values = [1, 2, 3, 4, 5];
    let i = 0;
    const read = () => {
      if (i >= values.length) return true;
      return values[i++];
    };
    const done = jest.fn();
    const op = () => true;
    const sink = drain(op, done);
    sink(read);
    sink(read);
    sink(read);
    sink(read);
    sink(read);
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(null);
  });
});