import { asyncMap } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe('asyncMap', () => {
  it('should abort the stream when aborted', (done) => {
    const map = (data: any, cb: (err: any, data: any) => void) => {
      cb(null, data);
    };

    const asyncMapper = asyncMap(map);
    let readCalled = false;
    const read = (abort: any, cb: (err: any, data: any) => void) => {
      readCalled = true;
      if (abort) {
        cb(abort);
      } else {
        cb(null, 'data');
      }
    };

    const next = asyncMapper(read);
    let cbCalled = false;
    next(true, (err: any) => {
      expect(err).toBe(true);
      cbCalled = true;
    });

    expect(readCalled).toBe(true);
    expect(cbCalled).toBe(true);
    done();
  });
});