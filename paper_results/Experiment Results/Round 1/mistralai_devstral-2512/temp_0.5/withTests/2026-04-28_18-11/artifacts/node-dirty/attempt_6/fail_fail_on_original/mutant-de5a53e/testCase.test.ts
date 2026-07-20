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

  it('should properly destroy write stream when close is called', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      db.set('key1', 'value1');
      db.on('drain', () => {
        let writeCloseEmitted = false;
        db.on('write_close', () => {
          writeCloseEmitted = true;
        });

        db.close();

        setImmediate(() => {
          expect(writeCloseEmitted).toBe(true);
          expect(db._writeStream).toBeNull();
          done();
        });
      });
    });
  });
});