import { through } from '../../../../../../../../subject_repositories/pull-stream/throughs/through.js';

describe('through', () => {
  it('should call onEnd with null when abort is not true', (done) => {
    let called = false;
    const onEnd = jest.fn((err) => {
      expect(err).toBeNull();
      called = true;
    });
    const read = through(null, onEnd);
    read(null, () => {
      read(false, () => {
        expect(called).toBe(true);
        done();
      });
    });
  });

  it('should not call onEnd with null when abort is true', (done) => {
    let called = false;
    const onEnd = jest.fn((err) => {
      expect(err).toBeNull();
      called = true;
    });
    const read = through(null, onEnd);
    read(true, () => {
      expect(called).toBe(false);
      done();
    });
  });
});