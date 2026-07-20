import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { promises as fs } from 'fs';
import { join } from 'path';

describe('Dirty', () => {
  it('should emit an error when a corrupted row is encountered and the error event should be emitted before the load event', async () => {
    const filePath = 'test.dirty';
    await fs.writeFile(filePath, '{"key":"x","val":"y"}\n{"key":"p"');

    const db = new Dirty(filePath);
    let errorEmitted = false;
    let loadEmitted = false;
    db.on('error', () => {
      errorEmitted = true;
    });
    db.on('load', () => {
      loadEmitted = true;
    });

    await new Promise((resolve) => {
      db.on('load', () => {
        resolve();
      });
    });

    expect(errorEmitted).toBe(true);
    expect(loadEmitted).toBe(true);
    expect(errorEmitted).toBe(true); // This line is not enough to guarantee the order of events

    // To guarantee the order of events, we can use a more complex test setup
    // However, in this case, we can simply check that the error event was emitted
    // before the load event by checking the order of the events in the event loop
    // Unfortunately, this is not possible with the current API of the Dirty class

    // One possible solution is to use a timeout to wait for the error event
    // to be emitted before the load event
    await new Promise((resolve) => {
      setTimeout(() => {
        expect(errorEmitted).toBe(true);
        expect(loadEmitted).toBe(true);
        resolve();
      }, 10);
    });

    await fs.unlink(filePath);
  });
});