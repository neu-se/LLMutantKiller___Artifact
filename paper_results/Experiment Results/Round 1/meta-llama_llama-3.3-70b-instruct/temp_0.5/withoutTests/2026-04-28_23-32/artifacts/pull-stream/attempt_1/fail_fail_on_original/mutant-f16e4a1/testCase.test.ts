import { reduce } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe('reduce function', () => {
  it('should handle ended stream correctly', (done) => {
    const reducer = (acc: any, data: any) => data;
    const cb = (err: any, result: any) => {
      if (err) {
        done(err);
      } else {
        if (result !== null) {
          done(new Error('Expected result'));
        } else {
          done();
        }
      }
    };

    const source = (err: any, cb: any) => {
      cb(true, null);
    };

    const sink = reduce(reducer, cb);
    sink(source);
  });
});