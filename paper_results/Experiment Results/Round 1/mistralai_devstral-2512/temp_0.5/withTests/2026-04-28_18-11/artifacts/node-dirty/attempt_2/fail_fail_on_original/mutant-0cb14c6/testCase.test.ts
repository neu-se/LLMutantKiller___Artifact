const Dirty = require("../../../../../../../../../../../lib/dirty/dirty.js");
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

describe('drain event emission on write completion', () => {
  const testDir = path.join(__dirname, 'tmp');
  const dbPath = path.join(testDir, 'test.dirty');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  afterEach(() => {
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
    }
  });

  it('should emit drain event when all writes complete', (done) => {
    const db = new Dirty(dbPath);
    let drainCount = 0;

    db.on('load', () => {
      db.set('key1', 'value1');
      db.set('key2', 'value2');
      db.set('key3', 'value3');

      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          expect(db.get('key1')).toBe('value1');
          expect(db.get('key2')).toBe('value2');
          expect(db.get('key3')).toBe('value3');
          done();
        }
      });
    });
  });
});