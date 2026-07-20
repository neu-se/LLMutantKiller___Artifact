import { map } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/map.js";

describe('map function', () => {
  it('should return id when mapper is falsy', () => {
    const originalMap = map(null);
    expect(typeof originalMap).toBe('function');

    const read = jest.fn();
    const abort = jest.fn();
    const cb = jest.fn();
    originalMap(read)(abort, cb);

    expect(read).toHaveBeenCalledTimes(1);
    expect(abort).not.toHaveBeenCalled();
    expect(cb).toHaveBeenCalledTimes(1);
  });
});