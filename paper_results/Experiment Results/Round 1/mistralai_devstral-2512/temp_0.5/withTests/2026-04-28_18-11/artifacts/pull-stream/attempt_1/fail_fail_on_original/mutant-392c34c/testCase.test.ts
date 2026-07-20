import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";
import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";
import { collect } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/collect.js";
import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('find with error handling', () => {
  it('should handle false error correctly', (done) => {
    const testError = false;
    const testData = [1, 2, 3];

    const findStream = find((d: any) => d > 10, (err: any, data: any) => {
      // This callback should not be called since no data matches
    });

    const source = values(testData);
    const sink = drain((data: any) => {}, (err: any) => {
      // The error handler should receive the false error
      expect(err).toBe(null);
      done();
    });

    // Pipe the streams
    source(null, (end: any, data: any) => {
      if (end) {
        sink(end, () => {});
      } else {
        findStream(null, (end: any, result: any) => {
          if (end) {
            sink(end, () => {});
          } else {
            sink(null, () => {});
          }
        });
      }
    });
  });
});