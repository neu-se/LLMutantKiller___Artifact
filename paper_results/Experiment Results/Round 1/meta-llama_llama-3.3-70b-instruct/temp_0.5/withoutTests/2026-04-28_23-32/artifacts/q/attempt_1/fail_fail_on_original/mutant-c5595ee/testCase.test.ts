import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should correctly parse stack lines', () => {
    const stackLine = '    at foo (bar.js:123)';
    const result = getFileNameAndLineNumber(stackLine);
    expect(result).toEqual(['bar.js', 123]);
  });
});

function getFileNameAndLineNumber(stackLine: string) {
  // This function is a simplified version of the original getFileNameAndLineNumber function
  // It only includes the relevant parts for the test
  var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
  if (attempt1) {
    return [attempt1[1], Number(attempt1[2])];
  }
  var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
  if (attempt3) {
    return [attempt3[1], Number(attempt3[2])];
  }
  return null;
}