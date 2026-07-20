import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should handle end condition correctly', () => {
    const callback = jest.fn();
    const read = drain(() => false, callback);
    expect(read).toBeInstanceOf(Function);
    read(null, (end: any) => {
      if (end) {
        callback(end);
      }
    });
  });
});