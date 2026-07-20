import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty file loading with utf-8 encoding', () => {
  it('should correctly load data from a file written with unicode characters', (done) => {
    const tmpDir = os.tmpdir();
    const filePath = path.join(tmpDir, `dirty-test-encoding-${Date.now()}.dirty`);

    // Write a dirty file with unicode content manually
    const row = JSON.stringify({ key: 'héllo', val: 'wörld' }) + '\n';
    fs.writeFileSync(filePath, row, 'utf-8');

    const db = new (Dirty as any)(filePath);
    db.on('load', (length: number) => {
      try {
        expect(length).toBe(1);
        expect(db.get('héllo')).toBe('wörld');
        fs.unlinkSync(filePath);
        done();
      } catch (err) {
        fs.unlinkSync(filePath);
        done(err);
      }
    });

    db.on('error', (err: Error) => {
      try {
        fs.unlinkSync(filePath);
      } catch (_) {}
      done(err);
    });
  });
});