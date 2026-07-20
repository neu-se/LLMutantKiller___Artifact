import map from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/map.js";

describe('map function', () => {
  it('should return id when mapper is falsy', () => {
    const originalMap = map(null);
    const read = jest.fn((abort, cb) => {
      cb(false, 'test');
    });
    const abort = jest.fn();
    const cb = jest.fn();

    originalMap(read)(abort, cb);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(false, 'test');
  });
});