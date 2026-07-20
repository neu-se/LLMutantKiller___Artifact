const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/index.js");

describe('drain mutation test', () => {
  it('should detect when cbed is incorrectly initialized to true', (done) => {
    const input = [1, 2, 3, 4, 5];
    const results: number[] = [];
    let callOrder: string[] = [];

    pull(
      pull.values(input),
      pull.drain(
        (data: number) => {
          callOrder.push(`data:${data}`);
          results.push(data);
          if (data === 3) {
            // This should trigger the mutation difference
            // In the original code, cbed starts as false, allowing the loop to continue
            // In the mutated code, cbed starts as true, which may cause different behavior
          }
        },
        (err: any) => {
          callOrder.push('done');
          expect(callOrder).toEqual(['data:1', 'data:2', 'data:3', 'data:4', 'data:5', 'done']);
          expect(results).toEqual([1, 2, 3, 4, 5]);
          done();
        }
      )
    );
  });
});