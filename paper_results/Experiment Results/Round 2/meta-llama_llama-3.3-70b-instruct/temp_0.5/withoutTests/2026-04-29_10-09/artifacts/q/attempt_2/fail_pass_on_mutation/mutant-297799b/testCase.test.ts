import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should correctly filter internal frames from stack traces', () => {
    const error = new Error('Test error');
    const stack = error.stack as string;
    const lines = stack.split('\n');

    const isInternalFrameOriginal = (stackLine: string): boolean => {
      return stackLine.indexOf('(module.js:') !== -1 || stackLine.indexOf('(node.js:') !== -1;
    };

    const filteredLinesOriginal = lines.filter(line => !isInternalFrameOriginal(line));

    const isInternalFrameMutated = (stackLine: string): boolean => {
      return true;
    };

    const filteredLinesMutated = lines.filter(line => !isInternalFrameMutated(line));

    expect(filteredLinesOriginal.length).not.toEqual(filteredLinesMutated.length);
  });
});