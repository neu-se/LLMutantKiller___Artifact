import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should correctly handle the hasStacks variable', () => {
    const originalHasStacks = Q.hasStacks;
    const originalQStartingLine = Q.qStartingLine;

    try {
      Q.hasStacks = false;
      Q.qStartingLine = undefined;

      const error = new Error();
      const stackLines = error.stack.split('\n');
      const lineNumber = stackLines[2].indexOf('@') > 0 ? stackLines[1] : stackLines[2];
      const fileNameAndLineNumber = /at .* \((.*):(\d+):(\d+)\)$/.exec(lineNumber);

      expect(fileNameAndLineNumber).toBeDefined();
    } finally {
      Q.hasStacks = originalHasStacks;
      Q.qStartingLine = originalQStartingLine;
    }
  });

  it('should not handle the hasStacks variable when it is set to false', () => {
    const originalHasStacks = Q.hasStacks;
    const originalQStartingLine = Q.qStartingLine;

    try {
      Q.hasStacks = false;
      Q.qStartingLine = undefined;

      const error = new Error();
      const stackLines = error.stack.split('\n');
      const lineNumber = stackLines[2].indexOf('@') > 0 ? stackLines[1] : stackLines[2];
      const fileNameAndLineNumber = /at .* \((.*):(\d+):(\d+)\)$/.exec(lineNumber);

      expect(fileNameAndLineNumber).toBeNull();
    } finally {
      Q.hasStacks = originalHasStacks;
      Q.qStartingLine = originalQStartingLine;
    }
  });
});