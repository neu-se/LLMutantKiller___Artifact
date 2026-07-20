import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('should handle multiple write operations correctly', (done) => {
    const dbPath = 'test.db';
    const db = new Dirty(dbPath);

    db.on('load', () => {
      db.set('key1', 'value1', () => {
        db.set('key2', 'value2', () => {
          db.on('drain', () => {
            db.set('key3', 'value3', () => {
              db.on('drain', () => {
                const data = fs.readFileSync(dbPath, 'utf8');
                const lines = data.split('\n');
                expect(lines.length).toBe(4);
                fs.unlinkSync(dbPath);
                done();
              });
            });
          });
        });
      });
    });
  });
});