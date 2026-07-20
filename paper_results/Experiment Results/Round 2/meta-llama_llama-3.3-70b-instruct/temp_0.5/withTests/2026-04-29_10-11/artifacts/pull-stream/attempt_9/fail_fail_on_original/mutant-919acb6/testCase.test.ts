import { drain } from '../../../sinks/drain.js';

describe('drain', () => {
  it('should handle end condition correctly', () => {
    const values = [1, 2, false];
    let i = 0;
    const read = drain((data: any) => {
      if (data === false) {
        return false;
      }
      return true;
    }, (end: any) => {
      expect(end).toBe(false);
    });
    read(null, (end: any, data: any) => {
      expect(data).toBe(1);
      read(null, (end: any, data: any) => {
        expect(data).toBe(2);
        read(null, (end: any, data: any) => {
          expect(data).toBe(false);
          expect(end).toBe(false);
        });
      });
    });
  });
});