import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should handle end condition correctly', () => {
    const callback = jest.fn();
    const read = drain(() => true, callback);
    read(true);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});