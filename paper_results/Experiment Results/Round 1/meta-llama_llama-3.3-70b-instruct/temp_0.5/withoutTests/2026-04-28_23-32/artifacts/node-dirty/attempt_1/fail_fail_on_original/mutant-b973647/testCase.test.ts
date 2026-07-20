import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { rimraf } from 'rimraf';

describe('Dirty', () => {
  it('emits an error event with the correct event name when the read stream encounters an error', async () => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    // Create a file with invalid JSON to trigger an error
    await new Promise((resolve, reject) => {
      const writeStream = require('fs').createWriteStream(dbPath);
      writeStream.write('Invalid JSON');
      writeStream.end();
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });

    const errorEventName = new Promise((resolve, reject) => {
      dirty.on('error', (err) => {
        resolve('error');
      });
      dirty.on('load', () => {
        reject(new Error('Expected an error event, but got a load event'));
      });
    });

    await errorEventName;
    await new Promise((resolve) => {
      dirty.on('load', () => {
        resolve();
      });
    });

    await new Promise((resolve, reject) => {
      rimraf(dbPath, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  });
});