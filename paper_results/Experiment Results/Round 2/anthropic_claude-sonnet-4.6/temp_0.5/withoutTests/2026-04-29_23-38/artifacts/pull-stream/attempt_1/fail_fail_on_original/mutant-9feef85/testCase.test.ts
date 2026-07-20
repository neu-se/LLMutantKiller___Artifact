import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js"

describe('values with null/undefined array', () => {
  it('should call cb(true) when array is null/falsy and abort is false', () => {
    const source = values(null);
    let called = false;
    let endValue: any = undefined;
    
    source(false, (end: any, data: any) => {
      called = true;
      endValue = end;
    });
    
    expect(called).toBe(true);
    expect(endValue).toBe(true);
  });
});