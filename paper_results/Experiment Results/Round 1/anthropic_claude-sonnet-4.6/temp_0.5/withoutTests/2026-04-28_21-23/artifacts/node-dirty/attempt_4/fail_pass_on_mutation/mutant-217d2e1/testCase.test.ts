import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database', () => {
  it('should emit drain after set when no path is configured', (done) => {
    const db = new Dirty(undefined);
    const events: string[] = [];

    db.on('load', () => {
      db.on('drain', () => {
        events.push('drain');
      });

      db.set('key1', 'val1', () => {
        events.push('cb1');
      });

      setImmediate(() => {
        setImmediate(() => {
          try {
            expect(events).toContain('drain');
            expect(events).toContain('cb1');
            expect(db.get('key1')).toBe('val1');
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
  });
});