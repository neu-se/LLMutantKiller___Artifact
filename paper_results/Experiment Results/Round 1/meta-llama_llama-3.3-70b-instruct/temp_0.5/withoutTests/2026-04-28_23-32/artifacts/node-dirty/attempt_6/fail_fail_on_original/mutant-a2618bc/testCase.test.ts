import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('should handle multiple write operations correctly', (done) => {
    const dbPath = 'test.db';
    const db = new Dirty(dbPath);

    db.on('load', () => {
      db.set('key1', 'value1', () => {
        db.set('key2', 'value2', () => {
          db.set('key3', 'value3', () => {
            db.on('drain', () => {
              db.close();
              setTimeout(() => {
                const data = fs.readFileSync(dbPath, 'utf8');
                const lines = data.split('\n');
                expect(lines.length).toBe(4);
                expect(lines[0]).toBe('{"key":"key1","val":"value1"}');
                expect(lines[1]).toBe('{"key":"key2","val":"value2"}');
                expect(lines[2]).toBe('{"key":"key3","val":"value3"}');
                fs.unlinkSync(dbPath);
                done();
              }, 100);
            });
          });
        });
      });
    });
  }, 20000);
});