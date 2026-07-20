import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty';
import fs from 'fs';

describe('Dirty', () => {
  it('should handle chunks with newline characters correctly', (done) => {
    const dirty = new Dirty('test.db');
    dirty.on('load', () => {
      dirty.set('key1', 'val1', () => {
        dirty.set('key2', 'val2', () => {
          dirty.on('drain', () => {
            dirty.close();
            dirty.on('read_close', () => {
              dirty.on('write_close', () => {
                const chunk = fs.readFileSync('test.db', 'utf8');
                expect(chunk).toContain('{"key":"key1","val":"val1"}\n');
                expect(chunk).toContain('{"key":"key2","val":"val2"}\n');
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