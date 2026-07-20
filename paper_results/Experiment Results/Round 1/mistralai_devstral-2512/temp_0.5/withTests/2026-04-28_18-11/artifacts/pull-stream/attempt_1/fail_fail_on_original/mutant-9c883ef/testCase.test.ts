import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('find with callback', () => {
  it('should call callback with found value when cb is provided', (done) => {
    const source = pull.values([1, 2, 3, 4, 5]);
    const testFn = (d: number) => d === 3;
    const callback = (err: any, result: number | null) => {
      expect(err).toBeNull();
      expect(result).toBe(3);
      done();
    };

    pull(
      source,
      find(testFn, callback)
    );
  });
});