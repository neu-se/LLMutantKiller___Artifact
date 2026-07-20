import through from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe('through stream end behavior', () => {
  it('should call onEnd with the abort value when end is true and abort is not true', (done) => {
    const testAbortValue = { custom: 'abort' };
    const onEnd = jest.fn();
    const op = jest.fn();
    const read = jest.fn((end, cb) => {
      cb(true, 'data');
    });

    const throughStream = through(op, onEnd);
    const result = throughStream(read);

    result(testAbortValue, (end: boolean, data: any) => {
      expect(onEnd).toHaveBeenCalledWith(testAbortValue);
      done();
    });
  });
});