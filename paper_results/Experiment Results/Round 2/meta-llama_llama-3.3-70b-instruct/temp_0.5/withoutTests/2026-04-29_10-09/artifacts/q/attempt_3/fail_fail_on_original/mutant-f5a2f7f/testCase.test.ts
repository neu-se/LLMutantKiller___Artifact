describe('Q', () => {
  it('should correctly handle the hasStacks variable', () => {
    const originalQ = Q;
    try {
      Q.hasStacks = true;
      const error = new Error();
      const stackLines = error.stack.split('\n');
      const lineNumber = stackLines[2].indexOf('@') > 0 ? stackLines[1] : stackLines[2];
      const fileNameAndLineNumber = /at .* \((.*):(\d+):(\d+)\)$/.exec(lineNumber);
      expect(fileNameAndLineNumber).toBeDefined();
    } finally {
      Q.hasStacks = false;
    }
  });

  it('should not handle the hasStacks variable when it is set to false', () => {
    const originalQ = Q;
    try {
      Q.hasStacks = false;
      const error = new Error();
      const stackLines = error.stack.split('\n');
      const lineNumber = stackLines[2].indexOf('@') > 0 ? stackLines[1] : stackLines[2];
      const fileNameAndLineNumber = /at .* \((.*):(\d+):(\d+)\)$/.exec(lineNumber);
      expect(fileNameAndLineNumber).toBeNull();
    } finally {
      Q.hasStacks = false;
    }
  });
});