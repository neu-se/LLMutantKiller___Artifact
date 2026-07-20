import { reduce } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe('reduce function', () => {
  it('should handle ended stream correctly', (done) => {
    const reducer = (acc: any, data: any) => data;
    const cb = (err: any, result: any) => {
      if (err) {
        done(err);
      } else {
        expect(result).toBe(null);
        done();
      }
    };

    const source = (err: any, read: any) => {
      read(true, null);
    };

    const sink = reduce(reducer, null, cb);
    sink(source);
  });
});