import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should emit an error event with a valid string when an error occurs while reading the file', async () => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);
    let errorEventEmitted = false;
    db.on('error', (err) => {
      expect(typeof err).toBe('object');
      expect(err).toHaveProperty('message');
      errorEventEmitted = true;
    });
    fs.writeFileSync(filePath, 'invalid json');
    await new Promise((resolve) => db.on('load', resolve));
    expect(errorEventEmitted).toBe(true);
  });
});