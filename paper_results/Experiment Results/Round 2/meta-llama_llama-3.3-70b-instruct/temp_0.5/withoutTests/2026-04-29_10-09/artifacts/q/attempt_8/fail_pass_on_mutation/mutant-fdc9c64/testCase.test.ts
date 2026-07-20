import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should correctly handle the isInternalFrame function', () => {
    const error = new Error();
    const stack = error.stack;
    const lines = stack.split('\n');
    const internalFrame = lines.find(line => line.includes("q.js"));
    if (internalFrame) {
      const fileNameAndLineNumber = Q.getFileNameAndLineNumber(internalFrame);
      if (fileNameAndLineNumber) {
        const fileName = fileNameAndLineNumber[0];
        const lineNumber = fileNameAndLineNumber[1];
        const qFileName = Q.qFileName;
        const qStartingLine = Q.qStartingLine;
        const qEndingLine = Q.qEndingLine;
        expect(Q.isInternalFrame(internalFrame)).toBe(fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine);
      }
    }
  });

  it('should fail when the isInternalFrame function is modified', () => {
    const error = new Error();
    const stack = error.stack;
    const lines = stack.split('\n');
    const internalFrame = lines.find(line => line.includes("q.js"));
    if (internalFrame) {
      const fileNameAndLineNumber = Q.getFileNameAndLineNumber(internalFrame);
      if (fileNameAndLineNumber) {
        const fileName = fileNameAndLineNumber[0];
        const lineNumber = fileNameAndLineNumber[1];
        const qFileName = Q.qFileName;
        const qStartingLine = Q.qStartingLine;
        const qEndingLine = Q.qEndingLine;
        expect(Q.isInternalFrame(internalFrame)).not.toBe(fileName === qFileName && lineNumber >= qStartingLine || lineNumber <= qEndingLine);
      }
    }
  });
});