import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain";

describe('drain', () => {
  it('should call done with an error when op returns false and abort is true', () => {
    let called = false;
    let err: any;
    const done = (e: any) => {
      called = true;
      err = e;
    };

    const sink = drain((data: any) => false, done);
    sink(true, () => {});
    expect(called).toBe(true);
    expect(err).toBe(true);
  });
});