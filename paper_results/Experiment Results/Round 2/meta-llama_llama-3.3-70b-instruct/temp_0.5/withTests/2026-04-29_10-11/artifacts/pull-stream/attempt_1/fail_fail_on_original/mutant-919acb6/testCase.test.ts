import { drain } from "../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should handle end condition correctly', () => {
    const err = new Error('test error');
    const read = drain((data) => {
      if (data === 2) {
        throw err;
      }
    }, (end) => {
      expect(end).toBe(err);
    });
    read(null, (end, data) => {
      expect(data).toBe(1);
      read(null, (end, data) => {
        expect(data).toBe(2);
      });
    });
    read(null, (end, data) => {
      expect(data).toBeUndefined();
    });
  });
});