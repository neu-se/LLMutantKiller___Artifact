import { count } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";
import { collect } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/collect.js";

describe('count source behavior at max boundary', () => {
  it('should emit exactly max values when max is finite', (done) => {
    const source = count(3);
    collect((err: any, results: any) => {
      expect(err).toBeNull();
      expect(results).toEqual([0, 1, 2]);
      done();
    })(source);
  });
});