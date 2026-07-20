import { take } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take function', () => {
  it('should call callback with error when ended and new data is received', (done) => {
    const read = jest.fn((end, cb) => {
      if (end) {
        cb(null, 'ended');
      } else {
        cb(null, null, 'data');
      }
    });

    const test = () => true;
    const takeStream = take(test, { last: false });
    const stream = takeStream(read);

    stream(true, (err) => {
      expect(err).toBeUndefined();
      stream(null, (err, data) => {
        expect(err).toBe(true);
        done();
      });
    });
  });
});