import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import { promises as fsp } from 'fs';

class MockDirty extends Dirty {
  constructor() {
    super();
    this._inFlightWrites = 0;
  }

  set(key, value) {
    super.set(key, value);
    this._inFlightWrites = -1;
  }
}

describe('Dirty', () => {
  it('should emit drain event when inFlightWrites is 0', async () => {
    const file = 'test.dirty';
    await fsp.unlink(file).catch(() => {});
    const db = new Dirty();
    db.set('key', 'value');
    await new Promise((resolve) => db.on('drain', resolve));

    let drainCount = 0;
    db.on('drain', () => {
      drainCount++;
    });

    db.set('key2', 'value2');
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(drainCount).toBe(2);
  });

  it('should not emit drain event when inFlightWrites is less than 0', async () => {
    const file = 'test.dirty';
    await fsp.unlink(file).catch(() => {});
    const db = new MockDirty();
    db.set('key', 'value');
    await new Promise((resolve) => db.on('drain', resolve));

    let drainCount = 0;
    db.on('drain', () => {
      drainCount++;
    });

    db._inFlightWrites = -1;
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(drainCount).toBe(1);
  });

  it('should emit drain event when inFlightWrites is 0 using mock implementation', async () => {
    const file = 'test.dirty';
    await fsp.unlink(file).catch(() => {});
    const db = new MockDirty();
    db.set('key', 'value');
    await new Promise((resolve) => db.on('drain', resolve));

    let drainCount = 0;
    db.on('drain', () => {
      drainCount++;
    });

    db.set('key2', 'value2');
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(drainCount).toBe(2);
  });

  it('should not emit drain event when inFlightWrites is less than 0 using mock implementation', async () => {
    const file = 'test.dirty';
    await fsp.unlink(file).catch(() => {});
    const db = new MockDirty();
    db.set('key', 'value');
    await new Promise((resolve) => db.on('drain', resolve));

    let drainCount = 0;
    db.on('drain', () => {
      drainCount++;
    });

    db._inFlightWrites = -1;
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(drainCount).toBe(1);
  });

  it('should emit drain event when inFlightWrites is 0 using testing library', async () => {
    const file = 'test.dirty';
    await fsp.unlink(file).catch(() => {});
    const db = new Dirty();
    db.set('key', 'value');
    await new Promise((resolve) => db.on('drain', resolve));

    let drainCount = 0;
    db.on('drain', () => {
      drainCount++;
    });

    db.set('key2', 'value2');
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(drainCount).toBe(2);
  });

  it('should not emit drain event when inFlightWrites is less than 0 using testing library', async () => {
    const file = 'test.dirty';
    await fsp.unlink(file).catch(() => {});
    const db = new MockDirty();
    db.set('key', 'value');
    await new Promise((resolve) => db.on('drain', resolve));

    let drainCount = 0;
    db.on('drain', () => {
      drainCount++;
    });

    db._inFlightWrites = -1;
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(drainCount).toBe(1);
  });
});