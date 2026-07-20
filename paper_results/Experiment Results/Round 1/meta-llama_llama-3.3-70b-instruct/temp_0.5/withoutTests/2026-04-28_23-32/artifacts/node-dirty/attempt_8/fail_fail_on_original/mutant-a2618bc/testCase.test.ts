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
                expect(lines[0]).toMatch(/"key":"key1"/);
                expect(lines[1]).toMatch(/"key":"key2"/);
                expect(lines[2]).toMatch(/"key":"key3"/);
                if (lines[0].includes('key1') && lines[1].includes('key2') && lines[2].includes('key3')) {
                  done();
                } else {
                  throw new Error('Test failed');
                }
              }, 100);
            });
          });
        });
      });
    });
  }, 60000);
});