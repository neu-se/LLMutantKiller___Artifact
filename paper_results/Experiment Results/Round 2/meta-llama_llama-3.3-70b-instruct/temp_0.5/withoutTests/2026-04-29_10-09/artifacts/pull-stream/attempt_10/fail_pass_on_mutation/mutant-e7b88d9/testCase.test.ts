import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take function', () => {
  it('should call callback with error when ended and new data is received', (done) => {
    const read = jest.fn((end: any, cb: any) => {
      if (end) {
        cb(null, 'ended');
      } else {
        cb(null, null, 'data');
      }
    });

    const test = () => false;
    const takeStream = take(test);
    const stream = takeStream(read);

    stream(null, (err: any, data: any) => {
      expect(err).toBe(true);
      expect(data).toBeUndefined();
      stream(true, (err: any, data: any) => {
        expect(err).toBeNull();
        expect(data).toBe('ended');
        stream(null, (err: any, data: any) => {
          expect(err).toBe(true);
          done();
        });
      });
    });
  });
});