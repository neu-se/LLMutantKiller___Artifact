import { through } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe('through function', () => {
  it('should call onEnd with correct argument', () => {
    let onEndCalled = false;
    let onEndArg: any;

    const onEnd = (arg: any) => {
      onEndCalled = true;
      onEndArg = arg;
    };

    const throughStream = through(null, onEnd);
    const read = (end: any, cb: (end: any, data: any) => void) => {
      cb(true, null);
    };

    throughStream(read)(true, () => {});

    expect(onEndCalled).toBe(true);
    expect(onEndArg).toBeNull();
  });
});