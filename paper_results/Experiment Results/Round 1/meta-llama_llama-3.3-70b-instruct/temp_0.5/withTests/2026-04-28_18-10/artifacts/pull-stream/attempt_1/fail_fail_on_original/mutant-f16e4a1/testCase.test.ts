import { reduce } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js';

describe('reduce function', () => {
  it('should return the correct result when the input stream ends immediately', (done) => {
    const source = () => (end: any, cb: any) => cb(true);
    const result = reduce((acc: any, current: any) => acc + current, 0, (err: any, result: any) => {
      if (err) done(err);
      else {
        done();
      }
    });
    const read = result(source());
    read(null, (end: any, data: any) => {
      if (end === true) {
        // The stream has ended, no data is expected
        done();
      }
    });
  });
});