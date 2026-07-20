import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('count source end handling', () => {
  it('should properly handle end signal in count source', (done) => {
    const count = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js");
    const source = count(5);
    let endHandled = false;

    source(true, (end: any) => {
      if (end === true) {
        endHandled = true;
      }
    });

    setImmediate(() => {
      expect(endHandled).toBe(true);
      done();
    });
  });
});