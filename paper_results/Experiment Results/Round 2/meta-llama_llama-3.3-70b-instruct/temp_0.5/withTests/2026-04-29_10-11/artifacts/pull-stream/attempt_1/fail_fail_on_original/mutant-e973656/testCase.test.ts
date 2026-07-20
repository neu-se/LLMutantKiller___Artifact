import { drain } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should handle end condition correctly', () => {
    const callback = jest.fn();
    const read = drain(null, callback);
    read(null, (end, data) => {
      if (end) {
        callback(end);
      }
    });
    read(true, (end, data) => {
      expect(end).toBe(true);
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});