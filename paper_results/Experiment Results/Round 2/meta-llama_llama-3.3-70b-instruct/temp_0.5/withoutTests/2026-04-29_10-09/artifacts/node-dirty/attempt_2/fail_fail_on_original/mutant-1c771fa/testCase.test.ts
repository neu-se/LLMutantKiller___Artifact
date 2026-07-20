import { Dirty } from '../../../lib/dirty/dirty.js';
import fs from 'fs';

describe('Dirty', () => {
  it('should emit an error when loading corrupted row', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    // Create a corrupted row in the database
    fs.writeFileSync(dbPath, 'Invalid JSON\n');

    dirty.on('load', () => {
      done.fail('Expected an error to be emitted');
    });

    dirty.on('error', (err) => {
      expect(err.message).toBe('Could not load corrupted row: Invalid JSON');
      fs.unlinkSync(dbPath);
      done();
    });
  });
});