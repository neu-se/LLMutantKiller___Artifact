import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('write stream encoding', () => {
  it('should correctly write and read back unicode characters from disk', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-encoding-test-${Date.now()}.dirty`);

    // Clean up any existing file
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);
    const unicodeValue = { text: 'héllo wörld ñoño 中文 🎉' };

    db.on('load', () => {
      db.set('unicode-key', unicodeValue, (err: Error | null) => {
        if (err) return done(err);

        // Read the raw file content and verify it's valid UTF-8
        const rawContent = fs.readFileSync(file, 'utf-8');
        let parsed: any;
        try {
          parsed = JSON.parse(rawContent.trim());
        } catch (e) {
          return done(new Error(`Failed to parse file content as JSON: ${rawContent}`));
        }

        // The written content should match what we stored
        expect(parsed.key).toBe('unicode-key');
        expect(parsed.val).toEqual(unicodeValue);
        expect(parsed.val.text).toBe('héllo wörld ñoño 中文 🎉');

        // Also verify by loading the db again
        const db2 = new Dirty(file);
        db2.on('load', (length: number) => {
          expect(length).toBe(1);
          const loaded = db2.get('unicode-key');
          expect(loaded).toEqual(unicodeValue);
          expect((loaded as any).text).toBe('héllo wörld ñoño 中文 🎉');

          try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
          done();
        });
        db2.on('error', done);
      });
    });

    db.on('error', done);
  });
});