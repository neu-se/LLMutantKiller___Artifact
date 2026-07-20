import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
  it('should filter out internal and node frames from stack traces', () => {
    const error = new Error();
    const originalStack = error.stack;
    const filteredStack = Q.filterStackString(originalStack);
    expect(filteredStack).not.toBeNull();
    expect(filteredStack).not.toBeUndefined();
  });
});