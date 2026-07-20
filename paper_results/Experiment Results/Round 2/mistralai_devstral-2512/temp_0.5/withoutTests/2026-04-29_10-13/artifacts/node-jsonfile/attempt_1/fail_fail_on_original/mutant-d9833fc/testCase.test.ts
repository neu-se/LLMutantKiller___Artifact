import { readFileSync } from './index.js';
import { writeFileSync } from './index.js';
import { mkdirSync, rmSync } from 'fs';
import { join } from 'path';

describe('jsonfile graceful-fs fallback', () => {
  it('should fallback to fs when graceful-fs is not available', () => {
    const testDir = join(process.cwd(), 'test-dir');
    mkdirSync(testDir, { recursive: true });
    const testFile = join(testDir, 'test.json');
    const testData = { hello: 'world' };

    writeFileSync(testFile, testData);

    const result = readFileSync(testFile);
    expect(result).toEqual(testData);

    rmSync(testDir, { recursive: true, force: true });
  });
});