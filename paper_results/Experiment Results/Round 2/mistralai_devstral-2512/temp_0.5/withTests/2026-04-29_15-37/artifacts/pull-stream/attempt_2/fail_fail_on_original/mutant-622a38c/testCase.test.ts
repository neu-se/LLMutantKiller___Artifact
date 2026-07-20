import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('reduce with immediate end', () => {
  it('should call callback with null error when stream ends immediately with true', (done) => {
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      cb(true); // End immediately with true
    };

    pull(
      source,
      pull.reduce((acc: number, data: number) => acc + data, (err: any, result: any) => {
        expect(err).toBeNull();
        expect(result).toBeUndefined();
        done();
      })
    );
  });
});