const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const asyncMap = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js");

describe('asyncMap identity function', () => {
  it('should return input value when no mapper is provided', (done) => {
    const testValue = 42;

    const source = (abort: any, cb: any) => {
      if (abort) return cb(abort);
      cb(null, testValue);
      return cb(true); // End stream
    };

    const read = pull(
      source,
      asyncMap(null)
    );

    read(null, (end: any, data: any) => {
      expect(end).toBeFalsy();
      expect(data).toBe(testValue);
      done();
    });
  });
});