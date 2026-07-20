import { through } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js';

describe('through', () => {
  it('should call onEnd with null when abort is true', () => {
    let called = false;
    const onEnd = (err: any) => {
      called = true;
      expect(err).toBeNull();
    };
    const t = (through as any)(null, onEnd);
    const read = t(null);
    read(true, () => {});
    expect(called).toBe(true);
  });

  // it('should call onEnd with abort when abort is not true', () => {
  //   let called = false;
  //   const onEnd = (err: any) => {
  //     called = true;
  //     expect(err).not.toBeNull();
  //   };
  //   const t = (through as any)(null, onEnd);
  //   const read = t(null);
  //   read(false, () => {});
  //   expect(called).toBe(true);
  // });
});