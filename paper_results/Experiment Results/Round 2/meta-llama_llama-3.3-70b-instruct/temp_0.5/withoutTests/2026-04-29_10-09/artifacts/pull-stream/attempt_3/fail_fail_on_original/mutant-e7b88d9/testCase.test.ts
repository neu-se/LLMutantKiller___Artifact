import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take function', () => {
  it('should call callback with data when test function returns true', (done) => {
    const read = jest.fn((end: any, cb: any) => {
      cb(null, null, 'data');
    });

    const test = () => true;
    const takeStream = take(test);
    const stream = takeStream(read);

    stream(null, (err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBe('data');
      done();
    });
  });
});