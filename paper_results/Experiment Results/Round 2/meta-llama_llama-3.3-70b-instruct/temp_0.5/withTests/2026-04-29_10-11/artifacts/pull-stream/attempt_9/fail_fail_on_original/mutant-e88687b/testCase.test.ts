import { drain } from '../../../sinks/drain.js';

describe('drain', () => {
  it('should handle abort correctly', () => {
    const op = jest.fn();
    const done = jest.fn();
    const sink = drain(op, done);
    const err = {};
    sink.abort(err);
    expect(op).not.toHaveBeenCalled();
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(null);
  });
});