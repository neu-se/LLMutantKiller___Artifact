import { drain } from "../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should call done with end when end is true', () => {
    let called = false;
    const done = (err: any) => {
      called = true;
    };
    const sink = drain(() => {}, done);
    sink(true, () => {});
    expect(called).toBe(true);
  });

  it('should not call done when end is true and end === true', () => {
    let called = false;
    const done = (err: any) => {
      called = true;
    };
    const sink = drain(() => {}, done);
    sink(true, () => {});
    expect(called).toBe(true);
  });

  it('should call done with end when end is not true', () => {
    let called = false;
    const done = (err: any) => {
      called = true;
    };
    const sink = drain(() => {}, done);
    sink('error', () => {});
    expect(called).toBe(true);
  });

  it('should throw end when done is not provided and end is not true', () => {
    const sink = drain(() => {});
    expect(() => sink('error', () => {})).toThrowError('no done callback supplied');
  });
});