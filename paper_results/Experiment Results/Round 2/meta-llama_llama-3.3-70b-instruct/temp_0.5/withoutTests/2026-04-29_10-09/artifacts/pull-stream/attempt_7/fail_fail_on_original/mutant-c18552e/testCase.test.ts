import through from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe('through function', () => {
  it('should call onEnd with correct argument when abort is not true', () => {
    let onEndCalled = false;
    let onEndArg: any;

    const throughStream = through(null, (abort: boolean | null) => {
      onEndCalled = true;
      onEndArg = abort;
    });

    const read = (end: boolean, cb: (end: boolean, data: string) => void) => {
      cb(end, 'data');
    };

    const stream = throughStream(read);
    stream(true, (end: boolean, data: string) => {});

    expect(onEndCalled).toBe(true);
    expect(onEndArg).toBeNull();

    onEndCalled = false;
    const stream2 = throughStream(read);
    stream2(false, (end: boolean, data: string) => {
      stream2(true, (end: boolean, data: string) => {
        expect(onEndCalled).toBe(true);
        expect(onEndArg).toBeNull();
      });
    });

    onEndCalled = false;
    const stream3 = throughStream(read);
    stream3(false, (end: boolean, data: string) => {
      stream3(false, (end: boolean, data: string) => {
        stream3(true, (end: boolean, data: string) => {
          expect(onEndCalled).toBe(true);
          expect(onEndArg).toBeNull();
        });
      });
    });
  });
});