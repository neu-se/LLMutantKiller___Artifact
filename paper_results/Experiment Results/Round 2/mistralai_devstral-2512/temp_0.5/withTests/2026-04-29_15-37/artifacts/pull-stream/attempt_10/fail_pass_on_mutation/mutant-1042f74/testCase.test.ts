const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");

describe('drain mutation test', () => {
  it('should detect mutation by testing synchronous callback execution', (done) => {
    const data = [1, 2, 3];
    let executionOrder: string[] = [];
    let readCount = 0;

    const source = (abort: any, cb: any) => {
      readCount++;
      if (abort) return cb(abort);
      if (readCount > data.length) return cb(true);

      executionOrder.push(`read-${readCount}`);
      cb(null, data[readCount - 1]);
      executionOrder.push(`after-cb-${readCount}`);
    };

    pull(
      source,
      drain((d: number) => {
        return true;
      }, (err: any) => {
        expect(err).toBeNull();
        // The mutation changes cbed initialization from false to true
        // This affects the loop behavior in drain
        // Original code should have all read-after-cb pairs
        // Mutated code may have different execution order
        expect(executionOrder).toEqual([
          'read-1', 'after-cb-1',
          'read-2', 'after-cb-2',
          'read-3', 'after-cb-3'
        ]);
        done();
      })
    );
  });
});