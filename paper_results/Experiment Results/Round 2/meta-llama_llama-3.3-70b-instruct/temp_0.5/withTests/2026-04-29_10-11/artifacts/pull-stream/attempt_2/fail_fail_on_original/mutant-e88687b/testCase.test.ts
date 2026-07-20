import { drain } from '../../../sinks/drain.js';

describe('drain', () => {
  it('should handle abort correctly', () => {
    const callback = jest.fn();
    const sink = drain(null, callback);
    const err = new Error('test error');
    sink.abort(err);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(err);
  });
});