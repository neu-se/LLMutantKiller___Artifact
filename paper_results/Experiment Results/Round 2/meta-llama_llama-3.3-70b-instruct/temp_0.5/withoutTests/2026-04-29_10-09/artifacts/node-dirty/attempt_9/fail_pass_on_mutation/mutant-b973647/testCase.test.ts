import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should emit an error event with the correct event name when an error occurs while reading from the file', (done) => {
    const tempDir = path.join(__dirname, 'temp');
    const filePath = path.join(tempDir, 'test.db');
    fs.mkdirSync(tempDir);
    fs.writeFileSync(filePath, 'invalid json');

    const dirty = new Dirty(filePath);
    let eventName = '';
    dirty.on('error', () => {
      eventName = 'error';
    });
    dirty.on('', () => {
      eventName = 'empty string';
    });
    dirty.on('load', () => {
      expect(eventName).toBe('error');
      fs.rmdirSync(tempDir, { recursive: true });
      done();
    });
  });
});