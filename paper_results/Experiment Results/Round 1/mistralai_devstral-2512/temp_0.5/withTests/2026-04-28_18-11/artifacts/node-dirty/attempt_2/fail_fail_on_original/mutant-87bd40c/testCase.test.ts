import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('close method behavior', () => {
  const testFile = path.join(__dirname, 'test-close.dirty');
  let db: any;

  beforeEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  afterEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  it('should destroy read stream when close is called', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        const readStream = db._readStream;
        expect(readStream).not.toBeNull();
        db.close();
        setImmediate(() => {
          expect(db._readStream).toBeNull();
          done();
        });
      });
    });
  });
});