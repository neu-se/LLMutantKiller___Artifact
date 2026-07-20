import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty', () => {
  it('should handle chunks without newlines correctly', () => {
    const tempDir = path.join(__dirname, 'temp');
    const filePath = path.join(tempDir, 'test.db');
    fs.mkdirSync(tempDir);
    const dirty = new Dirty(filePath);
    dirty.set('key', 'value');
    dirty.set('key2', 'value2');
    const data = fs.readFileSync(filePath, 'utf8');
    expect(data).toContain('\n');
    fs.rmdirSync(tempDir, { recursive: true });
  });
});