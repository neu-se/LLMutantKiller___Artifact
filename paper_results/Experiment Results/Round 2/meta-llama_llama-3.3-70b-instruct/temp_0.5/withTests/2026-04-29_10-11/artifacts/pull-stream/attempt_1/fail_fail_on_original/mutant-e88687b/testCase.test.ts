import { drain } from '../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should handle abort correctly', () => {
    const callback = jest.fn();
    const err = new Error('test error');
    const sink = drain(null, callback);
    sink.abort(err);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(err);
  });
});