const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");

describe('find with callback', () => {
  it('should call callback with found value when cb is provided', (done) => {
    const values = [1, 2, 3, 4, 5];
    let i = 0;

    pull(
      (end: any, cb: any) => {
        if (end) {
          cb(true);
        } else if (i < values.length) {
          cb(null, values[i++]);
        } else {
          cb(true);
        }
      },
      find((d: number) => d === 3, (err: any, result: number | null) => {
        expect(err).toBeNull();
        expect(result).toBe(3);
        done();
      })
    );
  });
});