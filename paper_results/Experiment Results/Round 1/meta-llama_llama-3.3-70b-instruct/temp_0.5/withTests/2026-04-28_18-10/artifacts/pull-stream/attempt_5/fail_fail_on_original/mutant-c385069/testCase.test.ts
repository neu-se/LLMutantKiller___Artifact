import { asyncMap } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe('asyncMap', () => {
  it('should handle abort correctly', (done) => {
    const asyncMapStream = asyncMap((data: any, cb: (err: any, data: any) => void) => {
      cb(null, data);
    });

    const read = asyncMapStream((read: any) => {
      return (abort: any, cb: (err: any, data: any) => void) => {
        read(abort, cb);
      };
    });

    let ended = false;
    read(null, (end: any, data: any) => {
      if (end === true) {
        ended = true;
      }
    });
    read(true, (end: any, data: any) => {
      if (end === true) {
        expect(ended).toBe(true);
        done();
      }
    });
  });
});