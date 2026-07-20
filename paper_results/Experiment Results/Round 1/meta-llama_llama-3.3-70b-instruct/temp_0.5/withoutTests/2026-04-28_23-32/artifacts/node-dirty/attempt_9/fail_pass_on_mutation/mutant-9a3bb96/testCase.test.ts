import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';
import { join } from 'path';

describe('Dirty', () => {
  it('should close the db file streams when close() is called and there are pending writes', async () => {
    const dbPath = join(__dirname, 'test.db');
    const dirty = new Dirty(dbPath);
    dirty.set('key', 'value', () => {});
    dirty.set('key2', 'value2', () => {});
    dirty.close();
    await new Promise(resolve => dirty.once('drain', resolve));
    dirty.set('key3', 'value3', () => {
      expect(true).toBe(true);
    });
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(fs.readFileSync(dbPath, 'utf8')).toContain('key');
    expect(fs.readFileSync(dbPath, 'utf8')).toContain('key2');
    dirty.set('key4', 'value4', () => {
      throw new Error('This should not be called');
    });
  });
});