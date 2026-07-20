import { reduce } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe('reduce function', () => {
  it('should handle end correctly', () => {
    const source = () => {
      return (end: any, cb: any) => {
        if (end) return cb(end);
        cb(null, 1);
      };
    };

    const callback = (err: any, result: any) => {
      expect(err).toBeNull();
      expect(result).toBe(1);
    };

    const reducer = reduce((acc: any, data: any) => acc + data, null, callback);
    reducer(source());
  });
});