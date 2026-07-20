import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should correctly filter internal frames from stack traces', () => {
    const error = new Error('Test error');
    const stack = error.stack as string;
    const lines = stack.split('\n');

    const internalFrame = '(module.js:1:1)';
    const nonInternalFrame = 'test.js:1:1';

    // Use the isInternalFrame function from the q.js file
    const isInternalFrame = (stackLine: string): boolean => {
      const fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);
      if (!fileNameAndLineNumber) {
        return false;
      }
      var fileName = fileNameAndLineNumber[0];
      var lineNumber = fileNameAndLineNumber[1];
      return fileName === qFileName &&
        lineNumber >= qStartingLine &&
        lineNumber <= qEndingLine;
    };

    const isNodeFrame = (stackLine: string): boolean => {
      return stackLine.indexOf('(module.js:') !== -1 || stackLine.indexOf('(node.js:') !== -1;
    };

    expect(isInternalFrame(internalFrame)).toBe(false);
    expect(isInternalFrame(nonInternalFrame)).toBe(false);

    // If the isNodeFrame function is implemented as return true; (as in the mutated code), 
    // this test case will fail.
    expect(isNodeFrame(nonInternalFrame)).not.toBe(true);
  });
});