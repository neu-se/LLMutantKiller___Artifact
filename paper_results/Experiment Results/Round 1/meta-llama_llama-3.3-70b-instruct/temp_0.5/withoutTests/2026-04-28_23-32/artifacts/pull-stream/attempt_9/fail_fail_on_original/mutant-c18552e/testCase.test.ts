import through from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe('through function', () => {
  it('should call onEnd with the correct argument', () => {
    let onEndCalled = false;
    let onEndArg: any;

    const onEnd = (arg: any) => {
      onEndCalled = true;
      onEndArg = arg;
    };

    const throughStream = through(null, onEnd);
    const read = (end: any, cb: (end: any, data: any) => void) => {
      cb(false, null);
    };

    throughStream(read)(false, () => {});
    expect(onEndCalled).toBe(false);

    throughStream(read)(true, () => {});
    expect(onEndCalled).toBe(true);
    expect(onEndArg).toBeNull();

    onEndCalled = false;
    onEndArg = undefined;
    throughStream(read)(false, () => {});
    expect(onEndCalled).toBe(false);

    onEndCalled = false;
    onEndArg = undefined;
    throughStream(read)(false, () => {});
    throughStream(read)(false, () => {});
    expect(onEndCalled).toBe(false);

    onEndCalled = false;
    onEndArg = undefined;
    throughStream(read)(true, () => {});
    expect(onEndCalled).toBe(true);
    expect(onEndArg).toBeNull();

    onEndCalled = false;
    onEndArg = undefined;
    throughStream(read)(false, () => {});
    expect(onEndCalled).toBe(false);
    throughStream(read)(true, () => {});
    expect(onEndCalled).toBe(true);
    expect(onEndArg).toBeNull();

    onEndCalled = false;
    onEndArg = undefined;
    throughStream(read)(false, () => {});
    expect(onEndCalled).toBe(false);
    throughStream(read)(true, () => {});
    expect(onEndCalled).toBe(true);
    expect(onEndArg).toBeNull();
    throughStream(read)(false, () => {});
    expect(onEndCalled).toBe(true);
  });
});