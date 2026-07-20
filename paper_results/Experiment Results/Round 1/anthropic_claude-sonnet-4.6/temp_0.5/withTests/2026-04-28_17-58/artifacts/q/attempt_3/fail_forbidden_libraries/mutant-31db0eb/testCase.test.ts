import { jest } from '@jest/globals';

describe("Q requestTick initialization", () => {
  it("should initialize correctly when window is undefined in non-Node environment", () => {
    jest.resetModules();
    
    const savedProcess = global.process;
    const savedSetImmediate = (global as any).setImmediate;  
    const savedWindow = (global as any).window;
    const savedMessageChannel = (global as any).MessageChannel;
    
    const flushCalls: any[] = [];
    const mockSetImmediate = jest.fn((fn: Function) => { fn(); });
    (mockSetImmediate as any).bind = (thisArg: any, fn: Function) => {
      return () => mockSetImmediate.call(thisArg, fn);
    };
    
    try {
      // Simulate non-Node, non-browser environment with setImmediate
      (global as any).process = { 
        toString: () => "[object Object]",
        env: {}
      };
      delete (global as any).window;
      delete (global as any).MessageChannel;
      (global as any).setImmediate = mockSetImmediate;
      
      const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
      
      // Test that promises resolve correctly
      return new Promise<void>((resolve, reject) => {
        Q.resolve(42).then((val: number) => {
          expect(val).toBe(42);
          resolve();
        }).catch(reject);
        
        setTimeout(reject, 1000);
      });
    } finally {
      global.process = savedProcess;
      (global as any).setImmediate = savedSetImmediate;
      if (savedWindow !== undefined) {
        (global as any).window = savedWindow;
      }
      if (savedMessageChannel !== undefined) {
        (global as any).MessageChannel = savedMessageChannel;
      }
    }
  });
});