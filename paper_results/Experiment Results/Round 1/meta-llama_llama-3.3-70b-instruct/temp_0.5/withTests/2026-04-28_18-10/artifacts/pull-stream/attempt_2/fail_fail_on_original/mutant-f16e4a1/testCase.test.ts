import { reduce } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js';

describe('reduce function', () => {
  it('should handle the case where the stream ends immediately', (done) => {
    const source = () => (end: any, cb: any) => cb(true, 1);
    const result = reduce((acc: any, current: any) => acc + current, (err: any, result: any) => {
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