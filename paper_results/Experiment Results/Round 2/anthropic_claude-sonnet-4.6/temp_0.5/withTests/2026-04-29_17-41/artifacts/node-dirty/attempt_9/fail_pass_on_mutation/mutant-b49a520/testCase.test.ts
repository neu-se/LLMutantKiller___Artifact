import { EventEmitter } from 'events';

describe('dirty', () => {
  it('should correctly handle the data event when chunks have no newlines', (done) => {
    jest.resetModules();

    const readEmitter = new EventEmitter() as any;
    readEmitter.destroy = jest.fn();
    const writeEmitter = new EventEmitter() as any;
    writeEmitter.write = jest.fn(() => true);
    writeEmitter.end = jest.fn((cb?: () => void) => { if (cb) cb(); });
    writeEmitter.cork = jest.fn();
    writeEmitter.uncork = jest.fn();
    writeEmitter.destroy = jest.fn();

    jest.doMock('fs', () => ({
      createReadStream: jest.fn(() => readEmitter),
      createWriteStream: jest.fn(() => writeEmitter),
    }));

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty('/test/path.dirty');

    const errors: Error[] = [];
    db.on('error', (err: Error) => errors.push(err));

    process.nextTick(() => {
      readEmitter.emit('data', '{"key":"x","val":"y"}\n');
      readEmitter.emit('end');
      readEmitter.emit('close');
    });

    db.on('load', (length: number) => {
      expect(errors).toHaveLength(0);
      expect(length).toBe(1);
      expect(db.get('x')).toBe('y');
      done();
    });
  });
});