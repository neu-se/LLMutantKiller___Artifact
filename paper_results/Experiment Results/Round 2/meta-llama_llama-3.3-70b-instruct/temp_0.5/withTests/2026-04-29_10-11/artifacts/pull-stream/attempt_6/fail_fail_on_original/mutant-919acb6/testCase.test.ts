import { drain } from '../sinks/drain.js';

describe('drain', () => {
  it('should handle end condition correctly', () => {
    const read = drain((data: any) => {
      if (data === 2) {
        return false;
      }
      return true;
    }, (end: any) => {
      expect(end).toBeUndefined();
    });
    read(null, (end: any, data: any) => {
      expect(data).toBe(1);
      read(null, (end: any, data: any) => {
        expect(data).toBe(2);
        expect(end).toBe(true);
      });
    });
  });
});