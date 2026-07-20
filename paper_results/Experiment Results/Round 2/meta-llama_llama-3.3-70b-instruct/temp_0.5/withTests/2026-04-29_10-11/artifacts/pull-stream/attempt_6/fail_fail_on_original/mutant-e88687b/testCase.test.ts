import { drain } from '../../../sinks/drain.js';

describe('drain', () => {
  it('should handle abort correctly', () => {
    const done = jest.fn();
    const sink = drain(null, done);
    sink.abort('function');
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith('function');
  });
});