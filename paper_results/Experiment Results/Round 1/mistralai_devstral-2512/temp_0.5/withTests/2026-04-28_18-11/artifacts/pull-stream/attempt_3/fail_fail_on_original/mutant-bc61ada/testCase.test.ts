import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";
import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('reduce with immediate end', () => {
  it('should handle immediate end with true correctly', (done) => {
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      cb(true); // End immediately with true
    };

    pull(
      source,
      reduce((acc: number, data: number) => acc + data, (err: any, result: number) => {
        expect(err).toBeNull();
        expect(result).toBeNull();
        done();
      })
    );
  });
});