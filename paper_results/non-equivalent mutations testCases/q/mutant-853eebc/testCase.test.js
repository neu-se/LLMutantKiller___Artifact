const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

describe('Q array_map fallback behavior', () => {
  it('keeps allSettled results when Array.prototype.map is unavailable', async () => {
    const modulePath = process.env.Q_PATH
      ? path.resolve(process.env.Q_PATH)
      : path.resolve(__dirname, '../../subject_repositories/q/q.js');
    const qSource = fs.readFileSync(modulePath, 'utf8');
    const context = {
      setTimeout,
      clearTimeout,
      console,
      process,
    };
    context.window = context;

    vm.createContext(context);
    const ArrayCtor = vm.runInContext('Array', context);
    ArrayCtor.prototype.map = undefined;
    vm.runInContext(qSource, context);

    const states = await context.Q.allSettled([1, 2]);
    expect(states).toHaveLength(2);
    expect(states[0].state).toBe('fulfilled');
    expect(states[0].value).toBe(1);
    expect(states[1].state).toBe('fulfilled');
    expect(states[1].value).toBe(2);
  });
});
