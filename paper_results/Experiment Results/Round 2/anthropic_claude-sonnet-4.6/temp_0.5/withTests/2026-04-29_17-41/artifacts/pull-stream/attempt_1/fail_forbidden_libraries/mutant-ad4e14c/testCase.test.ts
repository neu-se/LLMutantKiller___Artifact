import { describe, it, expect } from '@jest/globals';
import through from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js';

describe('through onEnd callback', () => {
  it('should call onEnd with null when stream ends normally (abort === true)', (done) => {
    const receivedArgs: any[] = [];
    
    const onEnd = (err: any) => {
      receivedArgs.push(err);
    };

    const throughStream = through(null, onEnd);

    // Create a simple source that ends after one item
    const source = (end: any, cb: Function) => {
      if (end) {
        cb(end);
        return;
      }
      // End the stream normally
      cb(true, null);
    };

    const read = throughStream(source);

    read(null, (end: any, data: any) => {
      // First read: stream ends with true
      expect(end).toBe(true);
      // onEnd should have been called with null (not true)
      expect(receivedArgs.length).toBe(1);
      expect(receivedArgs[0]).toBeNull();
      done();
    });
  });
});