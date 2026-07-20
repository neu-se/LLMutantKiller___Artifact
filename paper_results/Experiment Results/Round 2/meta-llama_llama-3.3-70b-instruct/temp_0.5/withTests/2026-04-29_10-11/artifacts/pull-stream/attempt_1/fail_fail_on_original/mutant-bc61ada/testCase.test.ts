import { reduce } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";
import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";
import { collect } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/collect.js";

describe('reduce', () => {
  it('should handle initial value and callback correctly', (done) => {
    values([1, 2, 3])
     .pipe(reduce((acc, current) => acc + current, 0, (err, result) => {
        if (err) {
          done(err);
        } else {
          expect(result).toBe(6);
          done();
        }
      }));
  });

  it('should handle initial value and callback correctly when stream ends immediately', (done) => {
    values([])
     .pipe(reduce((acc, current) => acc + current, 0, (err, result) => {
        if (err) {
          done(err);
        } else {
          expect(result).toBe(0);
          done();
        }
      }));
  });

  it('should handle initial value and callback correctly when stream ends immediately with error', (done) => {
    values([])
     .pipe(reduce((acc, current) => acc + current, 0, (err, result) => {
        if (err) {
          done(err);
        } else {
          expect(result).toBe(0);
          done();
        }
      }));
  });

  it('should handle callback correctly when stream ends with error', (done) => {
    values([1, 2, 3])
     .pipe(reduce((acc, current) => {
        if (current === 3) {
          throw new Error('Test error');
        }
        return acc + current;
      }, 0, (err, result) => {
        if (err) {
          expect(err.message).toBe('Test error');
          done();
        } else {
          done(new Error('Expected error'));
        }
      }));
  });

  it('should handle initial value and callback correctly when stream ends with error and callback is provided', (done) => {
    values([1, 2, 3])
     .pipe(reduce((acc, current) => {
        if (current === 3) {
          throw new Error('Test error');
        }
        return acc + current;
      }, 0, (err, result) => {
        if (err) {
          expect(err.message).toBe('Test error');
          done();
        } else {
          done(new Error('Expected error'));
        }
      }));
  });
});