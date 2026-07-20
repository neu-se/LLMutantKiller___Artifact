import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
// @ts-ignore
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty close() destroys write stream', () => {
  it('should have _writeStream set to null after write stream closes, triggered by destroy()', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    const db = new Dirty(dbPath);

    db.once('load', () => {
      // Intercept the write stream's end method to check if destroy is called after
      const originalWriteStream = db._writeStream;
      let destroyCalled = false;
      const originalDestroy = originalWriteStream.destroy.bind(originalWriteStream);
      originalWriteStream.destroy = (...args: any[]) => {
        destroyCalled = true;
        return originalDestroy(...args);
      };

      db.close();

      setTimeout(() => {
        try { fs.rmSync(tmpDir, { recursive: true }); } catch (e) {}
        expect(destroyCalled).toBe(true);
        done();
      }, 300);
    });
  });
});