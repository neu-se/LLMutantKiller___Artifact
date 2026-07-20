import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";
import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe('reduce with immediate end', () => {
  it('should handle immediate end with true correctly', (done) => {
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      cb(true);
    };

    pull(
      source,
      reduce((acc: number, data: number) => acc + data, (err: any, result: any) => {
        expect(err).toBeNull();
        expect(result).toBeNull();
        done();
      })
    );
  });
});