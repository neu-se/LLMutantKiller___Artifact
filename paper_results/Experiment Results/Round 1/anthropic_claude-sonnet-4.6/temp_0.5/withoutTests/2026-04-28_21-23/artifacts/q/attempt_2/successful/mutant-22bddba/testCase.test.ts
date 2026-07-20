import vm from 'vm';
import fs from 'fs';
import path from 'path';

describe('Q module script-tag branch', () => {
  it('should assign Q to window when window is defined but self is not defined', () => {
    const qPath = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/q/q.js');
    const code = fs.readFileSync(qPath, 'utf8');

    const mockWindow: Record<string, any> = {};

    // Simulate a browser script-tag environment:
    // - window is defined
    // - self is NOT defined
    // - No CommonJS (no module/exports), no AMD (no define), no SES, no bootstrap
    // Original: typeof window !== "undefined" || typeof self !== "undefined" → true → assigns Q to window
    // Mutated:  false || typeof self !== "undefined" → false → falls to else → throws Error
    const context = vm.createContext({
      window: mockWindow,
      setTimeout,
      clearTimeout,
      process,
    });

    vm.runInContext(code, context);

    expect(mockWindow.Q).toBeDefined();
    expect(typeof mockWindow.Q).toBe('function');
  });
});