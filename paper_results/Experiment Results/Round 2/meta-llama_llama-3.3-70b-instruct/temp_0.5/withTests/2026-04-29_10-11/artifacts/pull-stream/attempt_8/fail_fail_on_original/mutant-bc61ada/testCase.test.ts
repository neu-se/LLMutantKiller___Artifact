import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/index.js";

describe('reduce', () => {
  it('should handle initial value and callback correctly', (done) => {
    pull(
      pull.values([1, 2, 3]),
      pull.reduce((acc, current) => acc + current, 0, (err, result) => {
        if (err) {
          done(err);
        } else {
          expect(result).toBe(6);
          done();
        }
      })
    );
  });

  it('should handle initial value and callback correctly when stream ends immediately', (done) => {
    pull(
      pull.values([1]),
      pull.reduce((acc, current) => acc + current, 0, (err, result) => {
        if (err) {
          done(err);
        } else {
          expect(result).toBe(1);
          done();
        }
      })
    );
  });

  it('should fail when stream ends immediately with no data and no initial value', (done) => {
    pull(
      pull.values([]),
      pull.reduce((acc, current) => acc + current, (err, result) => {
        if (err) {
          expect(err).toBeInstanceOf(Error);
          done();
        } else {
          done(new Error('Expected error'));
        }
      })
    );
  });
});