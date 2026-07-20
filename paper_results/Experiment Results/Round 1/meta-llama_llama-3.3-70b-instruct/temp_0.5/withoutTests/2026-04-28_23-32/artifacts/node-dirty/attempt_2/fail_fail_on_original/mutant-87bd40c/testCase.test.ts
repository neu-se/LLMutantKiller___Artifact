import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('should destroy the read stream when closing', async () => {
    const path = 'test.db';
    const dirty = new Dirty(path);
    await new Promise(resolve => dirty.once('load', resolve));
    dirty.close();
    // Check if the file descriptor of the read stream is still open
    await new Promise(resolve => dirty.once('read_close', resolve));
    expect(fs.existsSync(path)).toBe(true);
    // Try to read from the file, if the read stream is not destroyed, this should throw an error
    const fd = fs.openSync(path, 'r');
    fs.closeSync(fd);
    // If we reach this point, the read stream was destroyed
    fs.unlinkSync(path);
  });
});