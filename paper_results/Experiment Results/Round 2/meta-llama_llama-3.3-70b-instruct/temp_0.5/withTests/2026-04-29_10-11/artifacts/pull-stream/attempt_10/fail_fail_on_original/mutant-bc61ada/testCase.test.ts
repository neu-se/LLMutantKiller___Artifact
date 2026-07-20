import { reduce } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";
import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";
import { collect } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/collect.js";

describe('reduce', () => {
  it('should handle initial value and callback correctly', (done) => {
    values([1, 2, 3])
     .pipe(reduce((acc, current) => acc + current, 0))
     .pipe(collect((err, result) => {
        if (err) {
          done(err);
        } else {
          expect(result).toEqual([6]);
          done();
        }
      }));
  });

  it('should handle initial value and callback correctly when stream ends immediately', (done) => {
    values([1])
     .pipe(reduce((acc, current) => acc + current, 0))
     .pipe(collect((err, result) => {
        if (err) {
          done(err);
        } else {
          expect(result).toEqual([1]);
          done();
        }
      }));
  });

  it('should fail when stream ends immediately with no data and no initial value', (done) => {
    values([])
     .pipe(reduce((acc, current) => acc + current))
     .pipe(collect((err, result) => {
        if (err) {
          expect(err).toBeInstanceOf(Error);
          done();
        } else {
          done(new Error('Expected error'));
        }
      }));
  });
});