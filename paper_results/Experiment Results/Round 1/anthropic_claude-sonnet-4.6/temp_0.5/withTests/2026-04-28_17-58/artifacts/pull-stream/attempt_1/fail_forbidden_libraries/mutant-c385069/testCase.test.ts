import { describe, it, expect } from '@jest/globals';
import asyncMap from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js';

describe('asyncMap abort when not busy', () => {
  it('should call the abort callback when aborting a non-busy stream (source responds synchronously)', (done) => {
    const err = new Error('abort');
    
    // A simple synchronous source that returns data immediately
    let sourceAbortCalled = false;
    function source(abort: any, cb: Function) {
      if (abort) {
        sourceAbortCalled = true;
        cb(abort);
      } else {
        cb(null, 42);
      }
    }
    
    const mapFn = asyncMap(function(data: any, cb: Function) {
      // Synchronous map - completes immediately, so busy=false after
      cb(null, data * 2);
    });
    
    const read = mapFn(source);
    
    // First read to consume one item (busy will be false after this completes synchronously)
    read(null, function(end: any, data: any) {
      expect(end).toBeFalsy();
      expect(data).toBe(84);
      
      // Now abort - stream is not busy
      read(err, function(abortErr: any) {
        expect(abortErr).toBe(err);
        done();
      });
    });
  });
});