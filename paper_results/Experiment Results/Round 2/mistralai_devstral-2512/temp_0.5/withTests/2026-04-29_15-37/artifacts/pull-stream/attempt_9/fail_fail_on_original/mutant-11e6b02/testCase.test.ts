const pull = require("../../../../../../../../../../../subject_repositories/pull-stream");

describe('take mutation test', () => {
  it('should correctly handle stream termination with last=false', (done) => {
    let terminationBehavior: 'original' | 'mutated' | null = null;

    // Create a source that will trigger termination
    const source = function (abort: any, cb: (end: any, data?: any) => void) {
      if (abort) {
        cb(abort);
      } else {
        // End immediately to trigger termination
        cb(true);
      }
    };

    // Monkey-patch the terminate function to detect the mutation
    const takeModule = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js");
    const originalTerminate = takeModule.__test_terminate;
    takeModule.__test_terminate = function(cb: any) {
      // In original code: last = false; cb(err || true)
      // In mutated code: last = true; cb(err || true)
      // We can detect this by checking the value of 'last' before the callback
      const lastBeforeCallback = this.last;

      // Call original terminate
      const result = originalTerminate.call(this, cb);

      // Check if last was false (original) or true (mutated)
      if (lastBeforeCallback === false) {
        terminationBehavior = 'original';
      } else if (lastBeforeCallback === true) {
        terminationBehavior = 'mutated';
      }

      return result;
    };

    const takeStream = pull.take(function(n: number) {
      return n < 2;
    }, { last: false });

    pull(
      source,
      takeStream,
      pull.collect(function(err: any, results: any[]) {
        if (terminationBehavior === 'original') {
          done(); // Original code behavior
        } else if (terminationBehavior === 'mutated') {
          done(new Error('Mutation detected: last was set to true during termination'));
        } else {
          done(new Error('Could not determine termination behavior'));
        }
      })
    );
  });
});