import { through } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe('through stream end behavior', () => {
  it('should call onEnd with the correct abort value when stream ends', (done) => {
    const onEnd = jest.fn();
    const mockOp = jest.fn();

    const stream = through(mockOp, onEnd);
    const mockRead = jest.fn((end, cb) => {
      if (end) {
        cb(end, null);
      } else {
        cb(null, 'data');
      }
    });

    const read = stream(mockRead);

    // First call with data
    read(null, (end, data) => {
      expect(data).toBe('data');
    });

    // End the stream with a specific abort value
    const abortValue = { error: 'test' };
    read(abortValue, (end, data) => {
      expect(end).toBe(abortValue);
      expect(onEnd).toHaveBeenCalledWith(abortValue);
      done();
    });
  });
});