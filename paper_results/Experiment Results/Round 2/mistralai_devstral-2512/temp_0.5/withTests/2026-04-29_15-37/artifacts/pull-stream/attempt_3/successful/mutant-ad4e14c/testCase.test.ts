import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";
import through from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe('through onEnd behavior', () => {
  it('should call onEnd with null when stream is aborted with true', (done) => {
    let onEndCalledWith: any = null;
    const onEnd = (value: any) => {
      onEndCalledWith = value;
    };

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
      } else {
        cb(null, 1);
      }
    };

    const read = pull(
      source,
      through(null, onEnd)
    );

    read(null, (end: any, data: any) => {
      read(true, (end: any) => {
        expect(onEndCalledWith).toBe(null);
        done();
      });
    });
  });
});