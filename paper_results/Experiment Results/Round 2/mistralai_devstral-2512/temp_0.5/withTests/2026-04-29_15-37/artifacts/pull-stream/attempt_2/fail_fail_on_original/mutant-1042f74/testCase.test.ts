const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");

describe('drain mutation test', () => {
  it('should process synchronous data correctly', (done) => {
    const data = [1, 2, 3];
    let processedCount = 0;

    pull(
      pull.values(data),
      drain((d: number) => {
        processedCount++;
        return true;
      }, (err: any) => {
        expect(err).toBeNull();
        expect(processedCount).toBe(data.length);
        done();
      })
    );
  });
});