import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/index.js";

describe('drain', () => {
  it('should not throw an error when done callback is supplied and no error occurs', () => {
    const spy = jest.fn();
    const sink = drain(() => true, spy);
    expect(() => {
      sink(null, () => {});
    }).not.toThrow();
  });
});