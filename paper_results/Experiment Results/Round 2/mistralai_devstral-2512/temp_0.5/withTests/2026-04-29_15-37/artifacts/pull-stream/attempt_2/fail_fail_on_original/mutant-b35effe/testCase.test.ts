import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('find error handling', () => {
  it('should pass error as-is when err is true', (done) => {
    const error = true;
    const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");

    pull(
      pull.values([1, 2, 3]),
      find((data: any) => false, (err: any, data: any) => {
        // Original: cb(err === true ? null : err, null)
        // Mutated: cb(err !== true ? null : err, null)
        // When err is true:
        // Original passes: null (because true === true)
        // Mutated passes: true (because true !== true is false)
        expect(err).toBe(true);
        expect(data).toBeNull();
        done();
      })
    );
  });
});