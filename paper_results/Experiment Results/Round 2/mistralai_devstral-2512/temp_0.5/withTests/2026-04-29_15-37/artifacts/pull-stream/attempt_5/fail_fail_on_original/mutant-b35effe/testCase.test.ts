const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");

describe('find error handling', () => {
  it('should pass error as-is when err is true', (done) => {
    const error = true;
    const values = [1, 2, 3];

    let i = 0;
    const source = (abort: any, cb: any) => {
      if (abort) {
        cb(abort);
      } else if (i >= values.length) {
        cb(true);
      } else {
        cb(null, values[i++]);
      }
    };

    pull(
      source,
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