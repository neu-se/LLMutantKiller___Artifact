import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('dirty flush behavior', () => {
  it('should write all queued keys and fire all callbacks when multiple keys are set simultaneously', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-mutant-test-${process.pid}-${Date.now()}.dirty`);
    const db = new (Dirty as any)(tmpFile);

    db.on('load', () => {
      const callbacksFired: string[] = [];

      db.set('alpha', 'value1', (err: Error | null) => {
        callbacksFired.push('alpha');
      });
      db.set('beta', 'value2', (err: Error | null) => {
        callbacksFired.push('beta');
      });
      db.set('gamma', 'value3', (err: Error | null) => {
        callbacksFired.push('gamma');
        expect(callbacksFired).toContain('alpha');
        expect(callbacksFired).toContain('beta');
        try { fs.unlinkSync(tmpFile); } catch {}
        done();
      });
    });
  }, 5000);
});