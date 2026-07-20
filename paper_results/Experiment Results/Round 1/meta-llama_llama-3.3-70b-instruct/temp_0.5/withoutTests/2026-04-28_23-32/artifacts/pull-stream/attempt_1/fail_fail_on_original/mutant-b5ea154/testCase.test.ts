import { map } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/map.js";

describe('map function', () => {
  it('should return id when mapper is falsy', () => {
    const result = map(null);
    expect(result).toBeExpectingAnFunction();
    const read = jest.fn();
    const abort = jest.fn();
    const cb = jest.fn();
    result(read)(abort, cb);
    read(abort, (end, data) => {
      if (!end) {
        expect(data).toBeNull();
      }
    });
  });
});