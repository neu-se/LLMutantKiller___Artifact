const pull = require('../../../../../../../../../../../subject_repositories/pull-stream/pull.js');
const through = require('../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js');

describe('through with onEnd callback', () => {
  it('should call onEnd with the correct abort value when stream ends', (done) => {
    let onEndCalled = false;
    let onEndValue: any = null;

    const testThrough = through(
      (data: any) => {
        // No operation on data
      },
      (abort: any) => {
        onEndCalled = true;
        onEndValue = abort;
      }
    );

    pull(
      pull.values([1, 2, 3]),
      testThrough,
      pull.collect((err: any, result: any) => {
        if (err) {
          done(err);
          return;
        }

        // Verify the stream processed data correctly
        expect(result).toEqual([1, 2, 3]);

        // Verify onEnd was called with the correct value
        expect(onEndCalled).toBe(true);
        expect(onEndValue).toBe(true);

        done();
      })
    );
  });
});