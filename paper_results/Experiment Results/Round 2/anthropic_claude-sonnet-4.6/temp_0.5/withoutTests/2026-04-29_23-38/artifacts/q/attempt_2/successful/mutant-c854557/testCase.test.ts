import Q from '../../../../../../../../../../../subject_repositories/q/q.js';
import path from 'path';

describe('Q getFileNameAndLineNumber anonymous frame parsing', () => {
  it('correctly filters anonymous q.js frames with multi-digit line numbers from long stack traces', async () => {
    const savedLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;
    
    try {
      // Get the absolute path of q.js to construct a fake anonymous stack frame
      const qPath = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/q/q.js');
      
      // Create a deferred with a fake stack that contains an anonymous q.js frame
      // with a multi-digit line number (matches the "attempt2" pattern)
      const deferred = Q.defer();
      
      // Set the promise's stack to a fake anonymous q.js frame
      // This frame matches: "at filename:lineNumber:columnNumber" (no function name)
      // With original code: attempt2 regex \d+ matches "500", isInternalFrame returns true, frame is filtered
      // With mutated code: attempt2 regex \d only matches single digits, fails for "500",
      //   getFileNameAndLineNumber returns undefined, isInternalFrame returns false, frame is NOT filtered
      deferred.promise.stack = `    at ${qPath}:500:10`;
      
      deferred.reject(new Error('test error'));
      
      let capturedError: Error | null = null;
      await deferred.promise.then(null, (err: Error) => {
        capturedError = err;
      });
      
      expect(capturedError).not.toBeNull();
      const stack = capturedError!.stack || '';
      
      // The fake anonymous q.js frame should be filtered out (it's an internal frame)
      // With original code: filtered (attempt2 correctly parses multi-digit line number)
      // With mutated code: NOT filtered (attempt2 fails for multi-digit line numbers)
      expect(stack).not.toContain('500:10');
      
    } finally {
      Q.longStackSupport = savedLongStackSupport;
    }
  });
});