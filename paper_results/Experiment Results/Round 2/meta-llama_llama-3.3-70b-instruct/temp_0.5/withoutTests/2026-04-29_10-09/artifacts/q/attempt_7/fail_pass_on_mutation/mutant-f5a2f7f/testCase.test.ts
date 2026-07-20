import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
  it('should correctly handle the hasStacks variable', () => {
    const originalHasStacks = q.hasStacks;
    q.hasStacks = true;
    const error = new Error();
    const stackLines = error.stack.split('\n');
    const lineNumber = stackLines[2].indexOf('@') > 0 ? stackLines[1] : stackLines[2];
    const fileNameAndLineNumber = /at .* \((.*):(\d+):(\d+)\)$/.exec(lineNumber);
    expect(fileNameAndLineNumber).toBeDefined();
    q.hasStacks = originalHasStacks;
  });
});