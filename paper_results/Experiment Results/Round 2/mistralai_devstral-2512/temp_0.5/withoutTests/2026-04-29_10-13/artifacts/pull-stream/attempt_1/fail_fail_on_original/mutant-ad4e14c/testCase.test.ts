import { through } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe('through stream end behavior', () => {
  it('should call onEnd with the correct abort value when stream ends', (done) => {
    const onEnd = jest.fn();
    const op = jest.fn();

    const source = jest.fn((end, cb) => {
      if (end) {
        cb(end, null);
      } else {
        cb(null, 'data');
      }
    });

    const throughStream = through(op, onEnd);
    const read = throughStream(source);

    // First call to read (not ending)
    read(null, (end, data) => {
      expect(data).toBe('data');
      expect(end).toBeNull();
    });

    // Second call to read (ending with abort value)
    read(true, (end, data) => {
      expect(end).toBe(true);
      expect(data).toBeNull();
      expect(onEnd).toHaveBeenCalledWith(true);
      done();
    });
  });
});