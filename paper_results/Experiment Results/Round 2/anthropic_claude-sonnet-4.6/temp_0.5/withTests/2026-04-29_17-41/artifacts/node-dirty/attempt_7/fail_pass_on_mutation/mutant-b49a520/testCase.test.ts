import { EventEmitter } from 'events';

describe('dirty', () => {
  it('should not process incomplete rows when chunk has no newline', (done) => {
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
      // Send a chunk that has a newline in the middle, leaving partial content in buffer
      // Then send a chunk that completes the record but has NO newline
      // Then send just a newline to complete it
      // Original: second chunk triggers early return, third chunk processes everything
      // Mutated: second chunk runs split/parse (no-op), third chunk processes everything
      // Result should be the same...
      
      // Let me try: send complete record + partial next record in one chunk
      // Then send rest of partial WITHOUT newline
      // Then send newline
      readEmitter.emit('data', '{"key":"first","val":1}\n{"key":"second"');
      readEmitter.emit('data', ',"val":2}');  // no newline - early return in original
      readEmitter.emit('data', '\n');
      readEmitter.emit('end');
      readEmitter.emit('close');
    });

    db.on('load', (length: number) => {
      expect(length).toBe(2);
      expect(db.get('first')).toBe(1);
      expect(db.get('second')).toBe(2);
      done();
    });

    db.on('error', done);
  });
});