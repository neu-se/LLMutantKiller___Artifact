import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database load behavior', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  it('should emit load event with correct data size when database file has trailing content', (done) => {
    // Create a test database file with valid data followed by trailing content
    const testData = '{"key":"testKey","val":"testValue"}\nTrailing content without newline';
    fs.writeFileSync(dbPath, testData);

    const dirty = new Dirty(dbPath);

    dirty.on('load', (size) => {
      try {
        expect(size).toBe(1);
        expect(dirty.get('testKey')).toBe('testValue');
        done();
      } catch (error) {
        done(error);
      }
    });

    dirty.on('error', (error) => {
      done(error);
    });
  });
});