import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should correctly handle the isInternalFrame function', () => {
    const error = new Error();
    const stack = error.stack;
    const lines = stack.split('\n');
    const fileNameAndLineNumber = Q.getFileNameAndLineNumber(lines[0]);

    if (fileNameAndLineNumber) {
      const fileName = fileNameAndLineNumber[0];
      const lineNumber = fileNameAndLineNumber[1];
      const qFileName = Q.qFileName;
      const qStartingLine = Q.qStartingLine;
      const qEndingLine = Q.qEndingLine;

      expect(Q.isInternalFrame(lines[0])).toBe(fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine);
    }
  });
});