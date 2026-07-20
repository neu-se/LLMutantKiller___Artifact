import { flatten } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js";

describe('flatten', () => {
  it('should handle abort and error correctly', (done) => {
    const read = jest.fn((abort, cb) => {
      if (abort) {
        cb(null, null); // simulate successful abort
      } else {
        cb(null, null); // simulate successful read
      }
    });

    const stream = flatten()(read);
    stream(true, (err) => {
      expect(read).toHaveBeenCalledTimes(2);
      expect(read).toHaveBeenNthCalledWith(1, true, expect.any(Function));
      expect(read).toHaveBeenNthCalledWith(2, null, expect.any(Function));
      done();
    });
  });
});