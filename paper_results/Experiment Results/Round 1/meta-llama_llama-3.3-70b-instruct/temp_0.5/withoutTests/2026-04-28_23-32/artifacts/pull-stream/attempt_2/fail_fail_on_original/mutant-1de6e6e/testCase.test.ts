import { reduce } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe('reduce function', () => {
  it('should handle source ending immediately with no initial value', (done) => {
    const cb = (err: any, acc: any) => {
      expect(err).toBeNull();
      expect(acc).toBeUndefined();
      done();
    };
    const source = () => {
      return (err: any, cb: any) => {
        cb(true, null);
      };
    };
    const reducer = (acc: any, data: any) => acc;
    const sink = reduce(reducer, cb);
    sink(source());
  });
});