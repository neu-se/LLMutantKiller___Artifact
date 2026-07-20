import { through } from '../../../throughs/through.js';
import { values } from '../../../sources/values.js';
import { collect } from '../../../sinks/collect.js';

describe('through', () => {
  it('should call onEnd with null when abort is false', (done) => {
    let called = false;
    const onEnd = jest.fn((err) => {
      expect(err).toBeNull();
      called = true;
    });
    const read = through(null, onEnd);
    read(null, () => {
      read(true, () => {
        expect(called).toBe(true);
        done();
      });
    });
  });

  it('should call onEnd with abort when abort is true', (done) => {
    let called = false;
    const onEnd = jest.fn((err) => {
      expect(err).toBe(true);
      called = true;
    });
    const read = through(null, onEnd);
    read(true, () => {
      expect(called).toBe(true);
      done();
    });
  });
});