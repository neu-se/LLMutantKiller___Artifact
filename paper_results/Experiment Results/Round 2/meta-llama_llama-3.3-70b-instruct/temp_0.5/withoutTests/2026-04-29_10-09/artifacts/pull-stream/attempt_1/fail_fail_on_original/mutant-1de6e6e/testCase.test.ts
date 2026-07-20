import { reduce } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe('reduce function', () => {
  it('should call callback with error when source ends immediately', (done) => {
    const reducer = (acc: any, data: any) => acc;
    const cb = (err: any, acc: any) => {
      expect(err).toBeNull();
      expect(acc).toBeUndefined();
      done();
    };

    const source = () => {
      return (err: any, cb: any) => {
        cb(true);
      };
    };

    const reduceFunc = reduce(reducer, cb);
    reduceFunc(source());
  });
});