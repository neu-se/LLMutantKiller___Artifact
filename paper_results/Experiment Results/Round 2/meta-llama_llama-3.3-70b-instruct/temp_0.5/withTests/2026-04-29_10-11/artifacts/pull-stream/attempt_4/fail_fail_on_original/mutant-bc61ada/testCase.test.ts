import { reduce } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";
import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('reduce', () => {
  it('should handle initial value and callback correctly', (done) => {
    const stream = values([1, 2, 3]);
    reduce((acc: number, current: number) => acc + current, 0, (err: any, result: any) => {
      if (err) {
        done(err);
      } else {
        expect(result).toBe(6);
        done();
      }
    })(stream);
  });
});