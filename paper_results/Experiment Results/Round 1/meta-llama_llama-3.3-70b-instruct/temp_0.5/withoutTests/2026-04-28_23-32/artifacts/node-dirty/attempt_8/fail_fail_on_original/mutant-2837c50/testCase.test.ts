import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty', () => {
  it('should close the file streams when drain event is emitted', (done) => {
    const dirty = new Dirty('test.db');
    dirty.on('load', () => {
      dirty.set('key', 'value', () => {
        dirty.on('drain', () => {
          dirty.close();
          expect(dirty._readStream).not.toBeNull();
          expect(dirty._writeStream).not.toBeNull();
          done();
        });
      });
    });
  });
});