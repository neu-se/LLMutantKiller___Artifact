import { drain } from '../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should handle end condition correctly', () => {
    const values = [1, 2, null];
    let i = 0;
    const read = drain((data: any) => {
      if (data === null) {
        return false;
      }
      return true;
    }, (end: any) => {
      expect(end).toBe(null);
    });
    read(null, (end: any, data: any) => {
      expect(data).toBe(1);
      read(null, (end: any, data: any) => {
        expect(data).toBe(2);
        read(null, (end: any, data: any) => {
          expect(data).toBe(null);
          expect(end).toBe(null);
        });
      });
    });
  });
});