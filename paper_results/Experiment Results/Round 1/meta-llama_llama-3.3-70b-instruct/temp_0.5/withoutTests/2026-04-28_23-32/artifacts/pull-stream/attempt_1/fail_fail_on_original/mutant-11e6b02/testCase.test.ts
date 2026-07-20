import { take } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take function', () => {
  it('should behave as expected when last is false', (done) => {
    const test = (data: any) => data !== 'stop';
    const takeStream = take(test, { last: false });
    const read = (err: any, cb: (err: any, data: any) => void) => {
      if (err) {
        expect(err).toBeUndefined();
        done();
      } else {
        cb(null, 'stop');
      }
    };
    takeStream(read, (err: any, data: any) => {
      expect(err).toBeUndefined();
      expect(data).toBeUndefined();
      done();
    });
  });
});