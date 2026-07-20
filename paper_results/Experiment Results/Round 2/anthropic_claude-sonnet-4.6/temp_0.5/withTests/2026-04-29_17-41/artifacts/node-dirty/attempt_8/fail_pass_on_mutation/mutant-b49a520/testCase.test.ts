import { EventEmitter } from 'events';

describe('dirty', () => {
  it('should report correct size after loading', (done) => {
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

    process.nextTick(() => {
      // Key insight: send a chunk with \n that leaves partial content in buffer,
      // then send a chunk WITHOUT \n that completes the JSON but has no \n,
      // then send \n to terminate
      // Both versions handle this identically...
      // 
      // Let me try: what if I send a chunk where the JSON itself contains
      // a value that looks like it could be split?
      readEmitter.emit('data', '{"key":"k1","val":"v1"}\n');
      readEmitter.emit('data', '{"key":"k2","val":"v2"}\n');
      readEmitter.emit('end');
      readEmitter.emit('close');
    });

    db.on('load', (length: number) => {
      expect(length).toBe(2);
      done();
    });

    db.on('error', done);
  });
});