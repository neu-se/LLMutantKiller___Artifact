import * as asyncMapModule from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe('asyncMap', () => {
  it('should abort the stream when aborted', (done) => {
    const map = (data: any, cb: (err: any, data: any) => void) => {
      cb(null, data);
    };

    const asyncMapper = asyncMapModule.default(map);
    let readCalled = false;
    let cbCalled = false;
    let cbValue: any;
    const read = (abort: any, cb: (err: any, data: any) => void) => {
      readCalled = true;
      if (abort) {
        cb(abort);
      } else {
        cb(null, 'data');
      }
    };

    const next = asyncMapper(read);
    next(false, (err: any, data: any) => {
      cbCalled = true;
      cbValue = err;
      next(true, (err: any) => {
        expect(readCalled).toBe(true);
        expect(cbCalled).toBe(true);
        expect(cbValue).toBeUndefined();
        expect(err).toBe(true);
        done();
      });
    });
  });
});