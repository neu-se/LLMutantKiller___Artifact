const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");

describe('drain mutation test', () => {
  it('should expose mutation by testing synchronous callback execution order', (done) => {
    const data = [1, 2, 3];
    let executionOrder: string[] = [];

    const source = (abort: any, cb: any) => {
      if (abort) return cb(abort);
      if (executionOrder.length >= data.length) return cb(true);

      executionOrder.push('before-cb');
      cb(null, data[executionOrder.length - 1]);
      executionOrder.push('after-cb');
    };

    pull(
      source,
      drain((d: number) => {
        return true;
      }, (err: any) => {
        expect(err).toBeNull();
        // The mutation changes cbed initialization from false to true
        // This affects whether the loop continues after the first callback
        // In the original code, the loop should continue properly
        // In the mutated code, the behavior changes
        expect(executionOrder).toEqual([
          'before-cb', 'after-cb',
          'before-cb', 'after-cb',
          'before-cb', 'after-cb'
        ]);
        done();
      })
    );
  });
});