import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should call the done callback when no error occurs', () => {
    const callback = jest.fn();
    const sink = drain(() => true, callback);
    const read = jest.fn();
    sink(read);
    expect(read).toHaveBeenCalledTimes(1);
  });
});