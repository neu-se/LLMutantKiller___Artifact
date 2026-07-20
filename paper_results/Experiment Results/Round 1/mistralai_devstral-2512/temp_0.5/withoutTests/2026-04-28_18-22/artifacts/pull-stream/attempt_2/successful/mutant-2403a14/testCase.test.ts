const through = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js");

describe('through stream end behavior', () => {
  it('should call onEnd with null when end is true', (done) => {
    const onEnd = jest.fn();
    const transform = through(null, onEnd);
    const mockRead = (end: any, cb: (end: any, data: any) => void) => {
      cb(end, 'data');
    };

    const read = transform(mockRead);
    read(true, (end: any, data: any) => {
      expect(onEnd).toHaveBeenCalledWith(null);
      done();
    });
  });
});