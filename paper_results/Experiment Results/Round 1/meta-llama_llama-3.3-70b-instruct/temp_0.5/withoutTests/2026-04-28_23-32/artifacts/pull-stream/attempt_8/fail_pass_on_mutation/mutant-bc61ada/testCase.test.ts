import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe('reduce function', () => {
  it('should handle ended stream correctly', (done) => {
    const reducer = (acc: any, data: any) => data;
    const cb = (err: any, result: any) => {
      if (err) {
        done(err);
      } else {
        if (err === null) {
          done();
        } else {
          done(new Error('Expected error to be null'));
        }
      }
    };

    const source = (err: any, cb: (end: any, data: any) => void) => {
      cb(false, 'data');
      cb(true, null);
    };

    const sink = reduce(reducer, null, cb);
    sink(source);
  });
});