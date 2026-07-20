import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('drain mutation test', () => {
  it('should process data correctly with synchronous source', (done) => {
    let processedCount = 0;
    const data = [1, 2, 3, 4, 5];

    pull(
      pull.values(data),
      drain((d: number) => {
        processedCount++;
        return true;
      }, (err) => {
        expect(err).toBeNull();
        expect(processedCount).toBe(data.length);
        done();
      })
    );
  });
});