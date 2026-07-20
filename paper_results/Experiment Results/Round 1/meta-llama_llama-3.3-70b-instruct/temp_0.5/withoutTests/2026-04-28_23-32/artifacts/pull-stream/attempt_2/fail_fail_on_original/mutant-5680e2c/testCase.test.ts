import * as throughModule from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe('through function', () => {
  it('should call onEnd with correct abort value', (done) => {
    let onEndCalled = false;
    let onEndAbortValue: any;

    const onEnd = (abort: any) => {
      onEndCalled = true;
      onEndAbortValue = abort;
    };

    const op = (data: any) => data;

    const read = (end: any, cb: any) => {
      cb(null, 'data');
    };

    const through = throughModule;
    const throughStream = through(op, onEnd);
    throughStream(read)(false, () => {
      expect(onEndCalled).toBe(true);
      expect(onEndAbortValue).toBeUndefined();
      done();
    });
  });
});