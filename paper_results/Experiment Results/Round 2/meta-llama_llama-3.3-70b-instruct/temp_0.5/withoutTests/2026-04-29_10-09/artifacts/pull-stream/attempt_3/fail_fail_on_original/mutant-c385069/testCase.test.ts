import * as asyncMapModule from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe('asyncMap function', () => {
  it('should handle abort signal when not busy', (done) => {
    const read = jest.fn((abort, cb) => {
      if (abort) {
        cb(null); // simulate successful abort
      } else {
        cb(null, null, 'data'); // simulate successful read
      }
    });

    const asyncMapInstance = asyncMapModule.default((data, cb) => {
      cb(null, data); // simulate successful mapping
    });

    const next = asyncMapInstance(read);
    next(true, (err) => {
      expect(read).toHaveBeenCalledTimes(2); // expect read to be called twice
      expect(read).toHaveBeenNthCalledWith(1, true, expect.any(Function));
      expect(read).toHaveBeenNthCalledWith(2, true, expect.any(Function));
      done();
    });
  });
});