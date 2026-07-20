import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q stack trace filtering", () => {
  it("filters anonymous Firefox-style internal Q frames where function name is empty", () => {
    Q.longStackSupport = true;

    const qPath: string = require.resolve(
      "../../../../../../../../../../../subject_repositories/q/q.js"
    );

    // Anonymous Firefox-style stack line: NO function name before @
    // Original regex /.*@(.+):(\d+)$/ matches because .* matches empty string
    // Mutant regex /.@(.+):(\d+)$/ does NOT match because . requires exactly one char
    const internalQLine = `@${qPath}:900`;
    const error = new Error("test rejection");
    error.stack = `Error: test rejection\n${internalQLine}\n@/external/test.js:10`;

    const deferred = Q.defer();

    const promise = deferred.promise.then(
      null,
      (err: Error) => {
        const stackLines = (err.stack || "").split("\n");
        const hasInternalLine = stackLines.some((line: string) => line === internalQLine);

        // Original: "@q.js:900" is parsed → recognized as internal frame → filtered out
        // Mutant: "@q.js:900" is NOT parsed (. needs one char before @) → kept in stack
        expect(hasInternalLine).toBe(false);

        Q.longStackSupport = false;
      }
    );

    deferred.reject(error);

    return promise;
  });
});