import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty', () => {
  it('should close the file streams when drain event is emitted', (done) => {
    const dirty = new Dirty('test.db');
    dirty.on('load', () => {
      dirty.set('key', 'value', () => {
        dirty.on('drain', () => {
          dirty.close();
          dirty.on('read_close', () => {
            dirty.on('write_close', () => {
              expect(dirty._readStream).toBeNull();
              expect(dirty._writeStream).toBeNull();
              done();
            });
          });
        });
      });
    });
  });
});