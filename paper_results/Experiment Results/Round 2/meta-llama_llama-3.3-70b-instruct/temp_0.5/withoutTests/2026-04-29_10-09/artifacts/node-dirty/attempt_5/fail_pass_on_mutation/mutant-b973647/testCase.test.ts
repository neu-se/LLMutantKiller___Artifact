import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('Dirty', () => {
  it('should emit an error event with the correct event name when an error occurs while reading from the file', (done) => {
    const tempDir = path.join(__dirname, 'temp');
    const filePath = path.join(tempDir, 'test.db');
    fs.mkdirSync(tempDir);
    fs.writeFileSync(filePath, 'invalid json');

    const dirty = new Dirty(filePath);
    let errorEventReceived = false;
    dirty.on('error', () => {
      errorEventReceived = true;
    });
    dirty.on('load', () => {
      expect(errorEventReceived).toBe(true);
      rimraf.sync(tempDir);
      done();
    });
    dirty.on('', () => {
      throw new Error('Unexpected event');
    });
  });
});