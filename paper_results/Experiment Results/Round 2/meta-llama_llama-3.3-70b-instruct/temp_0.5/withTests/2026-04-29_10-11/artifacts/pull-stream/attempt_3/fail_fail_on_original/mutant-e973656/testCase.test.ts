import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should handle end condition correctly', () => {
    const callback = jest.fn();
    const read = drain(() => true, callback);
    expect(read).toBeInstanceOf(Function);
    read(null, (end: any, data: any) => {
      if (end) {
        callback(end);
      }
    });
    read(true, (end: any, data: any) => {
      expect(end).toBe(true);
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});