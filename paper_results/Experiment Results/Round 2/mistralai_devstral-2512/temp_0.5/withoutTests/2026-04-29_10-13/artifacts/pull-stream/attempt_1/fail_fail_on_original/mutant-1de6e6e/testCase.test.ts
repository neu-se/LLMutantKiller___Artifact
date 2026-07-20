import { reduce } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe('reduce sink', () => {
  it('should call callback with accumulated value when source ends', (done) => {
    const reducer = (acc: number | null, data: number): number => {
      return acc === null ? data : acc + data;
    };

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      cb(null, 1);
      cb(null, 2);
      cb(null, 3);
      cb(true); // End the stream
    };

    reduce(reducer, null, (err: any, result: number) => {
      expect(err).toBeNull();
      expect(result).toBe(6); // 1 + 2 + 3
      done();
    })(source);
  });
});