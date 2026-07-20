import * as pull from "../index";

describe('drain mutation test', () => {
  it('should process data correctly when cbed is initially false', (done) => {
    const input = [1, 2, 3];
    const results: number[] = [];
    let callCount = 0;

    const drain = pull.drain((data: number) => {
      callCount++;
      results.push(data);
    }, () => {
      // Verify the behavior
      expect(results).toEqual([1, 2, 3]);
      expect(callCount).toBe(3);
      done();
    });

    pull(
      pull.values(input),
      drain
    );
  });
});