import { through } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js';

describe('through', () => {
  it('should call onEnd with null when abort is true', () => {
    let called = false;
    const onEnd = (err: any) => {
      called = true;
      expect(err).toBeNull();
    };
    const t = through(null, onEnd);
    const read = t(null);
    read(true, () => {});
    expect(called).toBe(true);
  });
});