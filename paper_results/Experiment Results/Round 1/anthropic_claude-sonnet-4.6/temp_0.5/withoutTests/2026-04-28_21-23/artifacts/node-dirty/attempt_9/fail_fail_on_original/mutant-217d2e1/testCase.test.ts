import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database', () => {
  it('should complete close after drain when writing without path', (done) => {
    const db = new Dirty(undefined);
    const sequence: string[] = [];

    db.on('load', () => {
      db.set('a', 1, () => { sequence.push('cb-a'); });
      db.set('b', 2, () => { sequence.push('cb-b'); });

      db.on('drain', () => {
        sequence.push('drain');
        try {
          expect(sequence).toContain('cb-a');
          expect(sequence).toContain('cb-b');
          expect(db.get('a')).toBe(1);
          expect(db.get('b')).toBe(2);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  }, 5000);
});