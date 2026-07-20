import { reduce } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe('reduce sink', () => {
  it('should use the accumulator as the initial value when only two arguments are provided', (done) => {
    const reducer = (acc: number, data: number) => acc + data;
    const initialValue = 10;
    const source = (abort: any, cb: (end: any, data?: number) => void) => {
      cb(null, 5);
      cb(null, 3);
      cb(true);
    };

    reduce(reducer, initialValue, (err: any, result: number) => {
      expect(err).toBeNull();
      expect(result).toBe(18); // 10 (initial) + 5 + 3
      done();
    })(source);
  });
});