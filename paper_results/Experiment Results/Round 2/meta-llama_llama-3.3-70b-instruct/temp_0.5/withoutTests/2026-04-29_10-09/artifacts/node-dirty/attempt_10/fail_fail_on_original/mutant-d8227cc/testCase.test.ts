import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty';
import fs from 'fs';

describe('Dirty', () => {
  it('should handle chunks without newline characters correctly', (done) => {
    const dirty = new Dirty('test.db');
    dirty.on('load', () => {
      dirty.set('key1', 'val1', () => {
        dirty.on('drain', () => {
          dirty.close();
          dirty.on('read_close', () => {
            dirty.on('write_close', () => {
              const chunk = '{"key":"key2","val":"val2"}';
              fs.appendFileSync('test.db', chunk);
              const dirty2 = new Dirty('test.db');
              dirty2.on('load', () => {
                expect(dirty2.get('key1')).toBe('val1');
                expect(() => dirty2.get('key2')).toThrowError('Could not load corrupted row');
                fs.unlinkSync('test.db');
                done();
              });
            });
          });
        });
      });
    });
  }, 10000);
});