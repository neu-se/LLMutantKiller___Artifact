import { drain } from '../../../sinks/drain.js';

describe('drain', () => {
  it('should handle end condition correctly', () => {
    const read = drain((data) => {
      return data !== 2;
    }, (end) => {
      expect(end).toBeUndefined();
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