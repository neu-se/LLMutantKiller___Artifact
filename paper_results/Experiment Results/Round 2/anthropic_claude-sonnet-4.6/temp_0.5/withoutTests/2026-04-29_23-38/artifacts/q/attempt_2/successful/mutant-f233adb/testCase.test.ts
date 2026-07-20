import * as vm from 'vm';
import * as fs from 'fs';
import * as path from 'path';

describe('Q ses branch', () => {
  it('sets ses.makeQ to the Q factory function when ses is defined and ses.ok() returns true', () => {
    const qPath = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/q/q.js');
    const code = fs.readFileSync(qPath, 'utf8');

    const ses = { ok: () => true, makeQ: undefined as any };

    const context = vm.createContext({
      ses,
      // Explicitly not providing module/exports so CommonJS branch is skipped
      module: undefined,
      exports: undefined,
      define: undefined,
      bootstrap: undefined,
      window: undefined,
      self: undefined,
      setTimeout,
      clearTimeout,
      setImmediate,
      process,
      console,
      MessageChannel: (global as any).MessageChannel,
      ReturnValue: undefined,
    });

    vm.runInContext(code, context);

    // In original code: ses.makeQ should be set to the definition function
    // In mutated code: ses branch body is empty, so ses.makeQ remains undefined
    expect(typeof ses.makeQ).toBe('function');
  });
});