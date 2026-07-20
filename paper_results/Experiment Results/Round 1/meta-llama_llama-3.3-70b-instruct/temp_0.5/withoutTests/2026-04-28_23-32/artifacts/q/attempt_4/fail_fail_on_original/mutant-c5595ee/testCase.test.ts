import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should correctly parse stack lines', () => {
    const stackLine = '    at foo (@bar.js:123)';
    const attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
    if (attempt3) {
      expect([attempt3[1], Number(attempt3[2])]).toEqual(['bar.js', 123]);
    } else {
      throw new Error('Failed to parse stack line');
    }
  });
});