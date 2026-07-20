import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should correctly capture the line number', () => {
    const error = new Error();
    const stackLines = error.stack.split('\n');
    const lineNumber = stackLines[2].indexOf('@') > 0 ? stackLines[1] : stackLines[2];
    const fileNameAndLineNumber = /at .* \((.*):(\d+):(\d+)\)$/.exec(lineNumber);
    expect(fileNameAndLineNumber).toBeDefined();
    expect(fileNameAndLineNumber[2]).toBe('1'); // This line number should match the line number where the error was thrown
  });
});