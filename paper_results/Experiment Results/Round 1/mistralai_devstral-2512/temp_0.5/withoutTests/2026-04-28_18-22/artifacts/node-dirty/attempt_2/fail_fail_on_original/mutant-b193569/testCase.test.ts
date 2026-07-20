import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database load behavior', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterAll(() => {
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
    }
    if (fs.existsSync(testDir)) {
      fs.rmdirSync(testDir);
    }
  });

  it('should emit error event when database file has trailing content', (done) => {
    // Create a test database file with valid data followed by trailing content
    const testData = '{"key":"testKey","val":"testValue"}\nTrailing content without newline';
    fs.writeFileSync(dbPath, testData);

    const dirty = new Dirty(dbPath);

    dirty.on('error', (error) => {
      try {
        expect(error.message).toContain('Corrupted row at the end of the db');
        done();
      } catch (error) {
        done(error);
      }
    });

    dirty.on('load', () => {
      done(new Error('Expected error event but got load event'));
    });
  });
});