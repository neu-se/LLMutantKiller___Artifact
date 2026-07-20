import { through } from '../../../../../../../../subject_repositories/pull-stream/throughs/through.js';

describe('through', () => {
  it('should call onEnd with the correct abort value', () => {
    let called = false;
    let abortValue: any;
    const onEnd = (abort: any) => {
      called = true;
      abortValue = abort;
    };

    const stream = through(null, onEnd);
    const read = stream(null);

    read(true, () => {});

    expect(called).toBe(true);
    expect(abortValue).toBeNull();

    // Test the mutated code
    const mutatedOnEnd = (abort: any) => {
      called = true;
      abortValue = abort;
    };

    const mutatedStream = through(null, mutatedOnEnd);
    const mutatedRead = mutatedStream(null);

    mutatedRead(true, () => {});

    expect(called).toBe(true);
    expect(abortValue).not.toBeNull();
  });
});