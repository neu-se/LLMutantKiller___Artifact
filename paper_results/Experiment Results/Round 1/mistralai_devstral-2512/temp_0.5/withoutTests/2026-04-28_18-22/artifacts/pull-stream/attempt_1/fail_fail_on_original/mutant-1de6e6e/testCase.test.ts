import { reduce } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe('reduce sink', () => {
  it('should call callback with accumulated value when source ends', (done) => {
    const reducer = (acc: number | null, data: number) => (acc || 0) + data;
    const source = (abort: any, cb: (end: boolean | Error, data?: number) => void) => {
      cb(false, 1);
      cb(false, 2);
      cb(false, 3);
      cb(true); // End the stream
    };

    reduce(reducer, 0, (err: Error | null, result: number | null) => {
      expect(err).toBeNull();
      expect(result).toBe(6); // 1 + 2 + 3
      done();
    })(source);
  });
});