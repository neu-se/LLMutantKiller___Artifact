const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const asyncMap = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js");

describe('asyncMap identity function', () => {
  it('should return input value when no mapper is provided', (done) => {
    const testValue = 42;
    let callCount = 0;

    const source = (abort: any, cb: any) => {
      if (abort) return cb(abort);
      if (callCount === 0) {
        callCount++;
        cb(null, testValue);
      } else {
        cb(true); // End stream
      }
    };

    const read = pull(
      source,
      asyncMap(null)
    );

    read(null, (end: any, data: any) => {
      if (!end) {
        expect(data).toBe(testValue);
        read(null, (end: any) => {
          expect(end).toBe(true);
          done();
        });
      }
    });
  });
});