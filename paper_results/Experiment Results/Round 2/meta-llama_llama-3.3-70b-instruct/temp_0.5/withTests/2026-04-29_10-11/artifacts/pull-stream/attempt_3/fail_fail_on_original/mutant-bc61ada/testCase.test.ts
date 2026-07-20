import { reduce } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";
import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";
import { collect } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/collect.js";

describe('reduce', () => {
  it('should handle initial value and callback correctly', (done) => {
    const stream = values([1, 2, 3]);
    stream.pipe(reduce((acc: number, current: number) => acc + current, 0, (err: any, result: any) => {
      if (err) {
        done(err);
      } else {
        expect(result).toBe(6);
        done();
      }
    }));
  });

  it('should handle initial value and callback correctly when stream ends immediately', (done) => {
    const stream = values([1]);
    stream.pipe(reduce((acc: number, current: number) => acc + current, 0, (err: any, result: any) => {
      if (err) {
        done(err);
      } else {
        expect(result).toBe(1);
        done();
      }
    }));
  });

  it('should handle initial value and callback correctly when stream ends immediately with no initial value', (done) => {
    const stream = values([1]);
    stream.pipe(reduce((acc: number, current: number) => acc + current, (err: any, result: any) => {
      if (err) {
        done(err);
      } else {
        expect(result).toBe(1);
        done();
      }
    }));
  });
});