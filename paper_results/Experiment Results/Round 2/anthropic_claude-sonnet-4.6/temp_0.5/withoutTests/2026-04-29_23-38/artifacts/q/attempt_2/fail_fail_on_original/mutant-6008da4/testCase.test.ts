import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick isNodeJS initial value", () => {
  it("wraps task errors asynchronously in non-Node environment allowing subsequent tasks to run", async () => {
    // Override process.toString to make the module think it's not in Node.js
    const origToString = process.toString;
    (process as any).toString = () => '[object Object]';
    
    jest.resetModules();
    let Q2: any;
    try {
      Q2 = require('../../../../../../../../../../../subject_repositories/q/q.js');
    } finally {
      (process as any).toString = origToString;
    }
    
    const events: string[] = [];
    
    const uncaughtHandler = (err: Error) => {
      events.push('uncaught');
    };
    process.on('uncaughtException', uncaughtHandler);
    
    try {
      await new Promise<void>((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('timeout')), 2000);
        
        Q2.nextTick(() => { events.push('task1'); });
        Q2.nextTick(() => { 
          events.push('task2');
          throw new Error("intentional error"); 
        });
        Q2.nextTick(() => { events.push('task3'); });
        Q2.nextTick(() => { 
          events.push('task4');
          clearTimeout(timer);
          resolve();
        });
      });
    } finally {
      process.off('uncaughtException', uncaughtHandler);
    }
    
    // Wait for any deferred async errors to fire
    await new Promise<void>((resolve) => setTimeout(resolve, 100));
    
    // Original (isNodeJS=false): task3 and task4 run BEFORE uncaught error fires
    // events = ['task1', 'task2', 'task3', 'task4', 'uncaught']
    // task3 index < uncaught index
    
    // Mutated (isNodeJS=true): uncaught fires BEFORE task3 and task4
    // events = ['task1', 'task2', 'uncaught', 'task3', 'task4']
    // task3 index > uncaught index
    
    const task3Idx = events.indexOf('task3');
    const uncaughtIdx = events.indexOf('uncaught');
    
    expect(task3Idx).toBeGreaterThan(-1); // task3 ran
    expect(uncaughtIdx).toBeGreaterThan(-1); // uncaught error occurred
    expect(task3Idx).toBeLessThan(uncaughtIdx); // task3 ran before uncaught error
  });
});