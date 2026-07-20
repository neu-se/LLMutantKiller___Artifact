import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take function', () => {
  it('should behave as expected when last is false', (done) => {
    const test = (any) => data !== 'stop';
    const takeStream = take(test, { last: false });
    const read = (end: any, cb: (err: any, any) => void) => {
      if (end) {
        cb(null, 'stop');
      } else {
        cb(null, 'data');
      }
    };
    takeStream(read)((err: any, data: any) => {
      expect(data).toBe('data');
      done();
    });
    takeStream(true)((err: any, data: any) => {
      expect(data).toBeUndefined();
      done();
    });
  });
});