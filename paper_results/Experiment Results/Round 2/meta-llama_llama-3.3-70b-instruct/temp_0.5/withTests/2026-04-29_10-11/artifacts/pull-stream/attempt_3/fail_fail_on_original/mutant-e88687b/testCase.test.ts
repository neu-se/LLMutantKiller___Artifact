import { drain } from '../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should handle abort correctly', () => {
    const op = function(data: any) {
      return data !== 'abort';
    };
    const done = jest.fn();
    const sink = drain(op, done);
    sink('abort');
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith('abort');
  });
});