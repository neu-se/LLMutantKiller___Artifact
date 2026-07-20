import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should pass on original code and fail on mutated code', () => {
    const originalDrain = drain((data: any) => {
      return data === 'test';
    }, (err: any) => {
      if (err) {
        throw err;
      }
    });

    const mutatedDrain = drain((data: any) => {
      return data === 'test';
    }, (err: any) => {
      if (err) {
        throw err;
      }
    });

    expect(() => {
      originalDrain(true, () => {});
    }).not.toThrow();

    expect(() => {
      mutatedDrain(abort && true, () => {});
    }).toThrow();
  });
});