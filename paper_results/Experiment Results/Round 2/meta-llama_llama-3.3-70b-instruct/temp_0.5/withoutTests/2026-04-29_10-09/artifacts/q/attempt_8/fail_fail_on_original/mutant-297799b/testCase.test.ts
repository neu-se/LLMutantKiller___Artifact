import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should correctly filter internal frames from stack traces', () => {
    const error = new Error('Test error');
    const promise = Q.reject(error);

    expect(promise.stack).not.toBeNull();
    const lines = (promise.stack as string).split('\n');
    const internalFrame = lines.find((line: string) => line.includes('(module.js:') || line.includes('(node.js:'));
    expect(internalFrame).toBeDefined();
  });
});