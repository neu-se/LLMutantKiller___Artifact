import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream";

describe('drain', () => {
  it('should call done with error when end is not true and done is provided', (done) => {
    pull(
      pull.values([1, 2, 3]),
      pull.drain((data) => {
        if (data === 2) {
          throw new Error('Test error');
        }
      }, (err) => {
        if (err) {
          done();
        } else {
          done(new Error('Expected error was not thrown'));
        }
      })
    );
  });
});