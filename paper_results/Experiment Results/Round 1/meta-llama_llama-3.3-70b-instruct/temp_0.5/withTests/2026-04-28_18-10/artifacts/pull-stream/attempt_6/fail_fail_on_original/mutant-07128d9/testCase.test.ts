import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should call done with error when end is an error', (done) => {
    const err = new Error('test error');
    const read = () => {
      done(err);
    };
    const sink = drain(read, (err) => {
      expect(err).toBe(err);
      done();
    });
  });
});