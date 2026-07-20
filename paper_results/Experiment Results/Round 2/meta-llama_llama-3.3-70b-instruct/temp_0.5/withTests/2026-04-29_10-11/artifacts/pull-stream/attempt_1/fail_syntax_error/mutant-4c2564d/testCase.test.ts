```typescript
import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return the correct value when key is a string', () => {
    const data = { foo: 'bar' };
    const key = 'foo';
    const result = prop(key)(data);
    expect(result).toBe('bar');
  });

  it('should return the correct value when key is a regexp', () => {
    const data = 'hello world';
    const key = /world/;
    const result = prop(key)(data);
    expect(result).toBe('world');
  });

  it('should return true when key is a regexp and exec returns a match in the mutated code', () => {
    const data = 'hello world';
    const key = /world/;
    // Simulate the mutation by returning