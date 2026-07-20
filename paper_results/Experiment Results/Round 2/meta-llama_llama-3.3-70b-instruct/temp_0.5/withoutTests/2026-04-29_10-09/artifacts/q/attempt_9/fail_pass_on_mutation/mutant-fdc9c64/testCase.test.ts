import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should correctly handle the filterStackString function', () => {
    const error = new Error();
    const stack = error.stack;
    const lines = stack.split('\n');
    const internalFrame = lines.find(line => line.includes("q.js"));
    if (internalFrame) {
      const filteredStack = Q.filterStackString(stack);
      expect(filteredStack.includes(internalFrame)).toBe(false);
    }
  });

  it('should fail when the isInternalFrame function is modified', () => {
    const error = new Error();
    const stack = error.stack;
    const lines = stack.split('\n');
    const internalFrame = lines.find(line => line.includes("q.js"));
    if (internalFrame) {
      const filteredStack = Q.filterStackString(stack);
      expect(filteredStack.includes(internalFrame)).toBe(true);
    }
  });
});