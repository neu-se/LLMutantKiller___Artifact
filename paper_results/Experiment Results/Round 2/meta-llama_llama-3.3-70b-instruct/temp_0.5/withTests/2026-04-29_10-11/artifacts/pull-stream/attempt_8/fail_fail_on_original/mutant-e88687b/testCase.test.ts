import { drain } from '../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should handle abort correctly', () => {
    const op = jest.fn();
    const done = jest.fn();
    const sink = drain(op, done);
    sink.abort('string');
    expect(op).not.toHaveBeenCalled();
    expect(done).toHaveBeenCalledTimes(1);
  });
});