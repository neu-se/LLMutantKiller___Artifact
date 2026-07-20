import { count } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('count source with end signal', () => {
  it('should call callback with end signal when end is truthy', (done) => {
    const source = count(5);
    let endCalled = false;

    // First read to get a value
    source(null, (end, data) => {
      if (end) {
        endCalled = true;
        return;
      }

      // Now send an end signal
      source(true, (endResult) => {
        if (endResult === true) {
          endCalled = true;
        }
      });
    });

    // Give a moment for async operations
    setImmediate(() => {
      expect(endCalled).toBe(true);
      done();
    });
  });
});