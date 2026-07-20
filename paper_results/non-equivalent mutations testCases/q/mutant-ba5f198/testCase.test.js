const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

describe('Q browser bootstrap without setImmediate', () => {
  it('falls back to setTimeout and still runs Q.nextTick', (done) => {
    const modulePath = path.resolve(__dirname, '../../subject_repositories/q/q.js');
    const qSource = fs.readFileSync(modulePath, 'utf8');
    const context = {
      window: {},
      setTimeout,
      clearTimeout,
      setImmediate: undefined,
      MessageChannel: undefined,
      console,
    };

    vm.createContext(context);
    expect(() => vm.runInContext(qSource, context)).not.toThrow();

    const Q = context.window.Q;
    expect(typeof Q).toBe('function');

    let ran = false;
    Q.nextTick(() => {
      ran = true;
    });

    setTimeout(() => {
      expect(ran).toBe(true);
      done();
    }, 20);
  });
});
