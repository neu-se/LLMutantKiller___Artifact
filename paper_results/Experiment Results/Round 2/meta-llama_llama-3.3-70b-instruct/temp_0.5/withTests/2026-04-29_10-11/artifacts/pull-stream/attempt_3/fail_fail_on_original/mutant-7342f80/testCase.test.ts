import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should call the done callback when no error occurs', () => {
    const callback = jest.fn();
    const read = drain(() => true, callback);
    read(null, () => {});
    read(true, () => {});
    expect(callback).toHaveBeenCalledTimes(1);
  });
});