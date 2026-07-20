import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should filter out Node.js internal frames from stack traces', () => {
    const error = new Error('Test error');
    const stack = error.stack as string;
    const lines = stack.split('\n');
    const filteredLines = lines.filter(line => !isNodeFrame(line));

    expect(filteredLines.length).toBeLessThan(lines.length);
  });
});

function isNodeFrame(stackLine: string): boolean {
  return stackLine.indexOf('(module.js:') !== -1 || stackLine.indexOf('(node.js:') !== -1;
}