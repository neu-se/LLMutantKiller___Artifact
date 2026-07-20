import asyncMap from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js';

describe('asyncMap abort when not busy', () => {
  it('should call the abort callback when aborting a non-busy stream', (done) => {
    const abortError = new Error('abort');

    // Synchronous source that handles abort immediately
    function source(abort: any, cb: Function) {
      if (abort) {
        cb(abort);
      } else {
        cb(null, 42);
      }
    }

    const mapFn = asyncMap(function(data: any, cb: Function) {
      // Synchronous map - completes immediately so busy=false after
      cb(null, data * 2);
    });

    const read = mapFn(source);

    // First read to get one item; map completes synchronously so busy=false
    read(null, function(end: any, data: any) {
      expect(end).toBeFalsy();
      expect(data).toBe(84);

      // Now abort - stream is not busy; abort callback must be called
      read(abortError, function(err: any) {
        expect(err).toBe(abortError);
        done();
      });
    });
  });
});