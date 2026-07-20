import through from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe('through stream end behavior', () => {
  it('should call onEnd with null when end is true and abort is true', (done) => {
    const onEnd = jest.fn();
    const op = jest.fn();
    const read = jest.fn((end, cb) => {
      cb(true, 'data');
    });

    const throughStream = through(op, onEnd);
    const result = throughStream(read);

    result(true, (end: boolean, data: any) => {
      expect(onEnd).toHaveBeenCalledWith(null);
      done();
    });
  });
});