import { pull } from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull-stream', () => {
  it('should throw an error when iterating over arguments with length greater than the actual number of arguments', () => {
    expect(() => {
      pull(function (read) {
        return read;
      }, function (read) {
        return read;
      }, function (read) {
        return read;
      }, function (read) {
        return read;
      }, function (read) {
        return read;
      });
    }).toThrow();
  });
});