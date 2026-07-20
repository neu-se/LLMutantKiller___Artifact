import { drain } from '../../../../sinks/drain.js';

describe('drain', () => {
  it('should handle abort correctly', () => {
    const op = function(data: any) {
      return true;
    };
    const done = jest.fn();
    const sink = drain(op, done);
    const err = new Error('test error');
    sink.abort(err);
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(null);
  });
});