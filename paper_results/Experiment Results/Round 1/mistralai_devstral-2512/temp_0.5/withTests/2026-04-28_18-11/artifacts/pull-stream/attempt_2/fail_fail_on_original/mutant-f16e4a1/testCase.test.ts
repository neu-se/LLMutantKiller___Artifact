import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('reduce with immediate end', () => {
  it('should handle immediate end with true correctly', (done) => {
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      cb(true);
    };

    pull(
      source,
      pull.reduce((acc: number, data: number) => acc + data, (err: any, result: any) => {
        expect(err).toBeNull();
        expect(result).toBeNull();
        done();
      })
    );
  });
});