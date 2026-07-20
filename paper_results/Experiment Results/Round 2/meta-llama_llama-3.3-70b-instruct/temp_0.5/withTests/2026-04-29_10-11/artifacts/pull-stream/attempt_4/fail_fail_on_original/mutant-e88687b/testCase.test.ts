import { drain } from '../../sinks/drain.js';

describe('drain', () => {
  it('should handle abort correctly', () => {
    const op = function(data: any) {
      return data !== 'abort';
    };
    const done = jest.fn();
    const sink = drain(op, done);
    sink.abort('function');
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith('function');
  });
});