const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const through = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js");

describe('through onEnd behavior', () => {
  it('should call onEnd with null when stream ends normally', (done) => {
    let onEndValue: any = null;

    const testThrough = through(
      (data: any) => { /* no-op */ },
      (abort: any) => {
        onEndValue = abort;
      }
    );

    pull(
      pull.values([1, 2, 3]),
      testThrough,
      pull.collect((err: any, result: any) => {
        expect(result).toEqual([1, 2, 3]);
        expect(onEndValue).toBe(null);
        done();
      })
    );
  });
});