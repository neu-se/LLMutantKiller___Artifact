import { through } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe('through stream end behavior', () => {
  it('should call onEnd with the correct value when stream ends with true', (done) => {
    const onEnd = jest.fn();
    const transform = through(null, onEnd);
    const mockRead = jest.fn((end, cb) => {
      if (end) {
        cb(end, null);
      } else {
        cb(null, 'data');
      }
    });

    const read = transform(mockRead);
    read(true, (end, data) => {
      expect(onEnd).toHaveBeenCalledWith(null);
      done();
    });
  });
});