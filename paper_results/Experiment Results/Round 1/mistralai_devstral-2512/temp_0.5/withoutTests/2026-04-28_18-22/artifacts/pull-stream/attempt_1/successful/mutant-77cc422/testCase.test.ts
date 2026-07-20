import count from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";

describe('count source', () => {
  it('should call callback with end error when end is truthy', (done) => {
    const source = count(5);
    const endError = new Error('test end');

    source(endError, (err, data) => {
      expect(err).toBe(endError);
      done();
    });
  });
});