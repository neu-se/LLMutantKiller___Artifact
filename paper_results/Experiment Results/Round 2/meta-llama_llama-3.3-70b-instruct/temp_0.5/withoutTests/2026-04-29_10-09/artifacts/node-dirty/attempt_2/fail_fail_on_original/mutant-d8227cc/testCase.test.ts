import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty';

describe('Dirty', () => {
  it('should handle chunks with newline characters correctly', (done) => {
    const dirty = new Dirty('test.db');
    dirty.on('load', () => {
      dirty.set('key1', 'val1', () => {
        dirty.on('drain', () => {
          dirty.close(() => {
            dirty.on('read_close', () => {
              dirty.on('write_close', () => {
                const fs = require('fs');
                fs.appendFileSync('test.db', 'key2{"key":"key2","val":"val2"}');
                const dirty2 = new Dirty('test.db');
                dirty2.on('load', () => {
                  expect(dirty2.get('key1')).toBe('val1');
                  expect(dirty2.get('key2')).toBe('val2');
                  done();
                });
              });
            });
          });
        });
      });
    });
  });
});