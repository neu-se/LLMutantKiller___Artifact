import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as rimraf from 'rimraf';

describe('Dirty', () => {
  it('should destroy the read stream when closing', async () => {
    const path = 'test.db';
    const dirty = new Dirty(path);
    await new Promise(resolve => dirty.once('load', resolve));
    dirty.close();
    // If the read stream is not destroyed, it will still be listening to events
    // and will not be garbage collected. We can't directly check if the stream
    // is destroyed, but we can check if the file is still open by trying to delete it.
    // If the file is still open, the deletion will fail.
    expect(() => rimraf.sync(path)).toThrowError();
  });
});