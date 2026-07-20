import { through } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('through onEnd behavior', () => {
  it('should call onEnd with the correct abort value when stream is aborted', (done) => {
    const onEnd = jest.fn();
    const source = jest.fn((abort, cb) => {
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

    read(null, (end, data) => {
      expect(data).toBe(1);
      read(true, (end) => {
        expect(end).toBe(true);
        expect(onEnd).toHaveBeenCalledWith(true);
        done();
      });
    });
  });
});