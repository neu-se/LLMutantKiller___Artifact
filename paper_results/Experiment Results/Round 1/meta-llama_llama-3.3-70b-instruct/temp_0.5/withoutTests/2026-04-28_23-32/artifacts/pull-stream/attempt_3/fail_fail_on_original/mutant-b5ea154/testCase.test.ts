import map from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/map.js";

describe('map function', () => {
  it('should return id when mapper is falsy', () => {
    const originalMap = map(null);
    const read = jest.fn();
    const abort = jest.fn();
    const cb = jest.fn();

    originalMap(read)(abort, cb);
    read(abort, (end, data) => {
      if (!end) {
        expect(data).toBeNull();
      }
    });

    read(abort, true, null);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(true, null);
  });
});