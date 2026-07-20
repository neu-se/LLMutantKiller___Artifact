import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull', () => {
  it('should handle 4 arguments correctly', () => {
    const read = (end: any, cb: any) => cb(null, 1);
    const result = pull(read, (read: any) => read, (read: any) => read, (read: any) => read);
    let count = 0;
    result(null, (end: any, data: any) => {
      count++;
      if (count === 4) {
        expect(end).toBe(true);
        expect(count).toBe(4);
      } else {
        expect(end).not.toBe(true);
      }
    });
    result(null, (end: any, data: any) => {
      count++;
      if (count === 4) {
        expect(end).toBe(true);
        expect(count).toBe(4);
      } else {
        expect(end).not.toBe(true);
      }
    });
    result(null, (end: any, data: any) => {
      count++;
      if (count === 4) {
        expect(end).toBe(true);
        expect(count).toBe(4);
      } else {
        expect(end).not.toBe(true);
      }
    });
    result(null, (end: any, data: any) => {
      count++;
      if (count === 4) {
        expect(end).toBe(true);
        expect(count).toBe(4);
      } else {
        expect(end).not.toBe(true);
      }
    });
  });
});