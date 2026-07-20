import { EventEmitter } from 'events';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';

jest.mock('fs', () => {
  const EventEmitter = require('events').EventEmitter;
  
  const mockReadStream = new EventEmitter();
  mockReadStream.destroy = () => {};
  
  const mockWriteStream = new EventEmitter();
  mockWriteStream.write = () => true;
  mockWriteStream.end = (cb?: () => void) => { if (cb) cb(); };
  mockWriteStream.destroy = () => {};
  mockWriteStream.cork = () => {};
  mockWriteStream.uncork = () => {};
  
  return {
    createReadStream: jest.fn(() => mockReadStream),
    createWriteStream: jest.fn(() => mockWriteStream),
    _mockReadStream: mockReadStream,
    _mockWriteStream: mockWriteStream,
  };
});

describe('Dirty database chunk processing', () => {
  it('should correctly load data when a chunk ends with newline at index 1', (done) => {
    const mockReadStream = (fs as any)._mockReadStream;
    
    const db = new Dirty('/fake/path');
    const errors: Error[] = [];
    db.on('error', (err: Error) => errors.push(err));
    
    db.on('load', (count: number) => {
      try {
        expect(errors).toHaveLength(0);
        expect(count).toBe(1);
        expect(db.get('hello')).toBe(42);
        done();
      } catch (e) {
        done(e as Error);
      }
    });
    
    process.nextTick(() => {
      // Chunk 1: no newline -> lastIndexOf('\n') === -1
      // Original: returns early (correct, waits for complete row)
      // Mutated: -1 !== 1, does NOT return early, processes partial buffer
      mockReadStream.emit('data', '{"key":"hello","val":42');
      // Chunk 2: '}\n' -> lastIndexOf('\n') === 1
      // Original: 1 !== -1, processes complete row correctly
      // Mutated: 1 === 1, returns early, skips processing -> end sees non-empty buffer -> error
      mockReadStream.emit('data', '}\n');
      mockReadStream.emit('end');
      mockReadStream.emit('close');
    });
  });
});