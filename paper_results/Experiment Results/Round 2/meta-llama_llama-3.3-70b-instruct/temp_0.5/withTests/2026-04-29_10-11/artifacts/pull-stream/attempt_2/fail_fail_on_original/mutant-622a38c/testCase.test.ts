import { reduce } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe('reduce function', () => {
  it('should handle immediate end correctly', () => {
    const source = () => {
      return (end: any, cb: any) => {
        cb(true, null);
      };
    };

    const callback = (err: any, result: any) => {
      expect(err).toBeNull();
    };

    reduce((acc: any, data: any) => acc + data, 0, callback)(source());
  });
});