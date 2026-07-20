const pull = require('../../../../pull.js');

describe('pull', () => {
  it('should handle an object as an argument', () => {
    const obj = { source: () => {} };
    const s = { sink: (read) => { read.sink = () => {}; } };
    pull(obj, s);
  });
});