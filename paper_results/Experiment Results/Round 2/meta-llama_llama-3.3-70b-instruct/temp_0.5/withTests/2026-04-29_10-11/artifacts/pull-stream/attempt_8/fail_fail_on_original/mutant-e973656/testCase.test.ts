import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should handle end condition correctly', () => {
    const callback = jest.fn();
    const read = drain(() => false, callback);
    read(null, () => {});
    read(true, () => {});
    read(true, () => {});
    expect(callback).toHaveBeenCalledTimes(1);
  });
});