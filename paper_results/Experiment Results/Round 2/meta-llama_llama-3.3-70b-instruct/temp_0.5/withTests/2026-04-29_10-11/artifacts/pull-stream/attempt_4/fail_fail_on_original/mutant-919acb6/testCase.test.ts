import { drain } from '../../../sinks/drain.js';

describe('drain', () => {
  it('should handle end condition correctly', () => {
    const values = [1, 2, 3];
    let i = 0;
    const read = drain((data: any) => {
      return data !== 2;
    }, (end: any) => {
      expect(end).toBeUndefined();
    });
    read(null, (end: any, data: any) => {
      if (i < values.length) {
        expect(data).toBe(values[i]);
        i++;
        read(null, (end: any, data: any) => {
          if (i < values.length) {
            expect(data).toBe(values[i]);
            i++;
          }
        });
      }
    });
  });
});