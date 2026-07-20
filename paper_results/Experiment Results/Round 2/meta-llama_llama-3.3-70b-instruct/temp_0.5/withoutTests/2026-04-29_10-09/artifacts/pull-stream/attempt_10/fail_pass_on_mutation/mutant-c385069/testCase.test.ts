import * as asyncMapModule from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe('asyncMap function', () => {
  it('should handle abort signal when not busy', (done) => {
    const read = jest.fn((abort: any, cb: any) => {
      if (abort) {
        cb(null); // simulate successful abort
      } else {
        cb(null, null, 'data'); // simulate successful read
      }
    });

    const asyncMapInstance = asyncMapModule.default((data: any, cb: any) => {
      cb(null, data); // simulate successful mapping
    });

    const next = asyncMapInstance(read);
    next(true, (err: any) => {
      expect(read).toHaveBeenCalledTimes(1); // expect read to be called once
      next(true, (err: any) => {
        expect(read).toHaveBeenCalledTimes(1); // expect read to be called once
        done();
      });
    });
  });
});