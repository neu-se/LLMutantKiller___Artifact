import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty database flush behavior', () => {
  it('should flush pending writes when queue has items', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      // Add items to queue
      dirty.set('key1', 'value1', () => {});
      dirty.set('key2', 'value2', () => {});

      // Get initial file content
      const initialContent = fs.readFileSync(dbPath, 'utf-8');
      const initialLines = initialContent.trim().split('\n').filter(line => line);

      // Force flush
      dirty._flush();

      setImmediate(() => {
        // Verify content was written
        const finalContent = fs.readFileSync(dbPath, 'utf-8');
        const finalLines = finalContent.trim().split('\n').filter(line => line);
        expect(finalLines.length).toBeGreaterThan(initialLines.length);

        dirty.close();
        fs.unlinkSync(dbPath);
        fs.rmdirSync(testDir);
        done();
      });
    });
  });
});