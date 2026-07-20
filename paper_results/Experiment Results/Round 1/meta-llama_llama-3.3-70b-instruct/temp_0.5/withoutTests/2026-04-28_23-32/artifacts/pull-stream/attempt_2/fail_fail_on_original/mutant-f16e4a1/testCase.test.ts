import * as reduceModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe('reduce function', () => {
  it('should handle ended stream correctly', (done) => {
    const reducer = (acc: any, data: any) => data;
    const cb = (err: any, result: any) => {
      if (err === null) {
        done();
      } else {
        done(new Error('Expected no error'));
      }
    };

    const source = (err: any, cb: any) => {
      cb(true, null);
    };

    const reduce = reduceModule;
    const sink = reduce(reducer, cb);
    sink(source);
  });
});