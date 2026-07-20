import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('find error handling', () => {
  it('should pass error as-is when err is true', (done) => {
    const error = true;
    const source = pull.values([1, 2, 3]);
    const testFn = (data: any) => false; // Never matches

    find(testFn, (err: any, data: any) => {
      // Original: cb(err === true ? null : err, null)
      // Mutated: cb(err !== true ? null : err, null)
      // When err is true:
      // Original passes: null (because true === true)
      // Mutated passes: true (because true !== true is false)
      expect(err).toBe(true);
      expect(data).toBeNull();
      done();
    })(source);
  });
});