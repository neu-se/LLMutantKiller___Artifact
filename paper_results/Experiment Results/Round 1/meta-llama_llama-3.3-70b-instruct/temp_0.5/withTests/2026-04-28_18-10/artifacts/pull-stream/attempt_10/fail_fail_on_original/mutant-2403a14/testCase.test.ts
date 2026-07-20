import through from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe('through test', () => {
  it('should pass when run against the original code and fail when run against the mutated code', (done) => {
    const stream = through(null, (abort: boolean) => {
      if (abort !== null) {
        done.fail('Abort should be null when stream ends');
      } else {
        done();
      }
    });
    stream(true, () => {});
  });
});