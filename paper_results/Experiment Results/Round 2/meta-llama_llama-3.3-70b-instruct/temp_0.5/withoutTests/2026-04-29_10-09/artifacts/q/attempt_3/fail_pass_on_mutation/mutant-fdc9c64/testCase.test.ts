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
        const qFileName = "q.js";
        const qStartingLine = 1;
        const qEndingLine = 1000;
        const isInternal = fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine;
        const originalIsInternalFrame = Q.isInternalFrame(internalFrame);
        expect(originalIsInternalFrame).toBe(isInternal);
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
        const qFileName = "q.js";
        const qStartingLine = 1;
        const qEndingLine = 1000;
        const isInternal = fileName === qFileName && lineNumber >= qStartingLine || lineNumber <= qEndingLine;
        const originalIsInternalFrame = Q.isInternalFrame(internalFrame);
        expect(originalIsInternalFrame).not.toBe(isInternal);
      }
    }
  });
});