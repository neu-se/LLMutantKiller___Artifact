import * as pull from '../../../../../../../../../../../subject_repositories/pull-stream';

describe('through', () => {
  it('should call onEnd with null when abort is true', () => {
    let called = false;
    let errValue: any;
    const onEnd = (err: any) => {
      called = true;
      errValue = err;
    };
    const t = (pull as any).through(null, onEnd);
    const read = t((end: any, cb: any) => {
      if (end) {
        cb(end);
      } else {
        cb(null, null);
      }
    });
    read(true, () => {});
    expect(called).toBe(true);
    expect(errValue).toBeNull();
  });

  it('should call onEnd with abort when abort is not true', () => {
    let called = false;
    let errValue: any;
    const onEnd = (err: any) => {
      called = true;
      errValue = err;
    };
    const t = (pull as any).through(null, onEnd);
    const read = t((end: any, cb: any) => {
      if (end) {
        cb(end);
      } else {
        cb(null, null);
      }
    });
    const abort = new Error('Test Abort');
    read(abort, () => {});
    expect(called).toBe(true);
    expect(errValue).not.toBeNull();
  });
});