import { Dirty } from '../../../lib/dirty/dirty';

describe('Dirty', () => {
  it('should handle chunks without newline characters correctly', (done) => {
    const dirty = new Dirty('test.db');
    const data = 'key1{"key":"key1","val":"val1"}';
    dirty.on('load', () => {
      dirty.set('key1', 'val1', () => {
        dirty.on('drain', () => {
          dirty.close(() => {
            dirty.on('read_close', () => {
              dirty.on('write_close', () => {
                const fs = require('fs');
                const chunk = fs.readFileSync('test.db', 'utf8');
                expect(chunk).toBe('{"key":"key1","val":"val1"}\n');
                done();
              });
            });
          });
        });
      });
    });
    const fs = require('fs');
    fs.writeFileSync('test.db', data);
  });
});