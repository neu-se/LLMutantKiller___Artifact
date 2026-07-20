import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";
import through from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe('through onEnd behavior', () => {
  it('should call onEnd with the correct abort value when stream is aborted', (done) => {
    const onEnd = jest.fn();
    const source = jest.fn((abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
      } else {
        cb(null, 1);
      }
    });

    const read = pull(
      source,
      through(null, onEnd)
    );

    read(null, (end: any, data: any) => {
      expect(data).toBe(1);
      read(true, (end: any) => {
        expect(end).toBe(true);
        expect(onEnd).toHaveBeenCalledWith(true);
        done();
      });
    });
  });
});