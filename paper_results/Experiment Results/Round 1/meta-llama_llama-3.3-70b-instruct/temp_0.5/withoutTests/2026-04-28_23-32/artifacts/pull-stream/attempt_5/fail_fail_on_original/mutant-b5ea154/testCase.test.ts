import map from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/map.js";

describe('map function', () => {
  it('should return id when mapper is falsy', () => {
    const originalMap = map(null);
    const read = jest.fn();
    const abort = jest.fn();
    const cb = jest.fn();

    originalMap(read)(abort, cb);
    read(abort, false, 'test');
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(false, 'test');

    originalMap(read)(abort, cb);
    read(abort, true, null);
    expect(cb).toHaveBeenCalledTimes(2);
    expect(cb).toHaveBeenNthCalledWith(2, true, null);
  });
});