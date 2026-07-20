const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

describe('Q SES bootstrap behavior', () => {
  it('registers a working SES factory when ses.ok() returns true', () => {
    const modulePath = process.env.Q_PATH
      ? path.resolve(process.env.Q_PATH)
      : path.resolve(__dirname, '../../subject_repositories/q/q.js');

    const qSource = fs.readFileSync(modulePath, 'utf8');
    const context = {
      ses: {
        ok: () => true,
        makeQ: undefined,
      },
    };

    vm.createContext(context);
    vm.runInContext(qSource, context);

    const Q = context.ses.makeQ();
    expect(typeof Q).toBe('function');
    expect(typeof Q.defer).toBe('function');
  });
});
