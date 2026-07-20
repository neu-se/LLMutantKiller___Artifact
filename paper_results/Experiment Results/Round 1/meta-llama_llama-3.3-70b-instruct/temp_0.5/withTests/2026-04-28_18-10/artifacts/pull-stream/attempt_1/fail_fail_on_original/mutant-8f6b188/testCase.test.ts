import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js"

describe('drain', () => {
  it('should handle end condition correctly', () => {
    const done = jest.fn();
    const sink = drain((data: any) => true, done);
    sink(null, (end: any, data: any) => {
      if (end) {
        expect(end).toBe(true);
        expect(data).toBeUndefined();
        done();
      }
    });
  });

  it('should handle end condition with end === true correctly', () => {
    const done = jest.fn();
    const sink = drain((data: any) => false, done);
    sink(true, (end: any, data: any) => {
      if (end) {
        expect(end).toBe(true);
        expect(data).toBeUndefined();
        done();
      }
    });
  });

  it('should throw an error when end is not true and done is not provided', () => {
    expect(() => drain((data: any) => true)).toThrowError('no done callback supplied');
  });
});