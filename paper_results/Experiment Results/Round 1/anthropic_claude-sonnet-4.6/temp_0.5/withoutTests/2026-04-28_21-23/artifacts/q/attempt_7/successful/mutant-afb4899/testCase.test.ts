import path from 'path';

describe("attempt2 regex $ anchor mutation detection", () => {
  it("Q frames present in stack with original code, filtered with mutated code", async () => {
    jest.resetModules();
    
    const qPath = require.resolve('../../../../../../../../../../../subject_repositories/q/q.js');
    const originalPrepare = (Error as any).prepareStackTrace;
    
    // Add " X" suffix to ALL stack lines - makes them not end with digits
    // Original attempt2 (with $): can't match → captureLine returns undefined → no filtering
    // Mutated attempt2 (no $): can match → captureLine returns line numbers → filtering works
    (Error as any).prepareStackTrace = (err: Error, frames: any[]) => {
      const lines = (frames as any[]).map((f: any) => {
        const file = f.getFileName() || 'unknown';
        const line = f.getLineNumber() || 0;
        const col = f.getColumnNumber() || 0;
        return `    at ${file}:${line}:${col} X`;
      });
      return `${err}\n${lines.join('\n')}`;
    };
    
    const Q = require('../../../../../../../../../../../subject_repositories/q/q.js');
    Q.longStackSupport = true;
    
    let errorStack = '';
    await new Promise<void>((resolve) => {
      const d = Q.defer();
      d.promise.then(null, (e: any) => {
        errorStack = e.stack || '';
        resolve();
      });
      d.reject(new Error("test rejection"));
    });
    
    (Error as any).prepareStackTrace = originalPrepare;
    
    // Original: no filtering → q.js path appears in errorStack
    // Mutated: Q frames filtered → q.js path removed from errorStack  
    expect(errorStack).toContain(qPath);
  });
});