import { take } from "../../../throughs/take";

describe('take function', () => {
  it('should behave as expected when last is false', (done) => {
    const test = (data: any) => data !== 'stop';
    const takeStream = take(test, { last: false });
    const read = (end: any, cb: (err: any, data: any) => void) => {
      if (end) {
        cb(null, 'stop');
      } else {
        cb(null, null, 'data');
      }
    };
    takeStream(read, (err: any, data: any) => {
      expect(err).toBeUndefined();
      expect(data).toBe('data');
      done();
    });
  });
});