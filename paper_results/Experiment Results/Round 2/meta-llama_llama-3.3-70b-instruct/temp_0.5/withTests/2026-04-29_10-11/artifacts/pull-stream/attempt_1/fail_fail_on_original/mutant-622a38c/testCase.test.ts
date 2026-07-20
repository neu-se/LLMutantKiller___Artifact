import { reduce } from '../../../../../subject_repositories/pull-stream/sinks/reduce.js';

describe('reduce function', () => {
  it('should handle immediate end correctly', (done) => {
    const source = () => {
      return (end, cb) => {
        cb(true, null);
      };
    };

    const callback = (err, result) => {
      if (err) {
        done(err);
      } else {
        done();
      }
    };

    reduce((acc, data) => acc + data, 0, callback)(source());
  });
});