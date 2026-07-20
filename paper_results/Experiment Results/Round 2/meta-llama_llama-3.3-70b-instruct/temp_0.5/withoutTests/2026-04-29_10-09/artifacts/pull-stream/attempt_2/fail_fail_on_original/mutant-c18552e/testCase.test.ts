import { through } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe('through function', () => {
  it('should call onEnd with correct argument when abort is not true', () => {
    let onEndCalled = false;
    let onEndArg: any;

    const throughStream = through(null, (abort) => {
      onEndCalled = true;
      onEndArg = abort;
    });

    const read = jest.fn((end, cb) => {
      cb(false, 'data');
    });

    const stream = throughStream(read);
    stream(true, () => {});

    expect(onEndCalled).toBe(true);
    expect(onEndArg).toBeNull();

    onEndCalled = false;
    const stream2 = throughStream(read);
    stream2(false, () => {});
    stream2(true, () => {});

    expect(onEndCalled).toBe(true);
    expect(onEndArg).toBeNull();
  });
});