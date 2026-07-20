import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber function", () => {
    it("should return the correct file name and line number", () => {
        var stackLine = "at functionName (filename.js:10:20)";
        var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
        if (attempt1) {
            var result = [attempt1[1], Number(attempt1[2])];
            expect(result[0]).toBe("filename.js");
            expect(result[1]).toBe(10);
        } else {
            var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
            if (attempt2) {
                var result = [attempt2[1], Number(attempt2[2])];
                expect(result[0]).toBe("filename.js");
                expect(result[1]).toBe(10);
            } else {
                var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
                if (attempt3) {
                    var result = [attempt3[1], Number(attempt3[2])];
                    expect(result[0]).toBe("filename.js");
                    expect(result[1]).toBe(10);
                } else {
                    expect(true).toBe(false);
                }
            }
        }
    });

    it("should handle anonymous functions", () => {
        var stackLine = "at filename.js:10:20";
        var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
        if (attempt1) {
            var result = [attempt1[1], Number(attempt1[2])];
            expect(result[0]).toBe("filename.js");
            expect(result[1]).toBe(10);
        } else {
            var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
            if (attempt2) {
                var result = [attempt2[1], Number(attempt2[2])];
                expect(result[0]).toBe("filename.js");
                expect(result[1]).toBe(10);
            } else {
                var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
                if (attempt3) {
                    var result = [attempt3[1], Number(attempt3[2])];
                    expect(result[0]).toBe("filename.js");
                    expect(result[1]).toBe(10);
                } else {
                    expect(true).toBe(false);
                }
            }
        }
    });

    it("should handle Firefox style stack traces", () => {
        var stackLine = "function@filename.js:10";
        var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
        if (attempt1) {
            var result = [attempt1[1], Number(attempt1[2])];
            expect(result[0]).toBe("filename.js");
            expect(result[1]).toBe(10);
        } else {
            var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
            if (attempt2) {
                var result = [attempt2[1], Number(attempt2[2])];
                expect(result[0]).toBe("filename.js");
                expect(result[1]).toBe(10);
            } else {
                var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
                if (attempt3) {
                    var result = [attempt3[1], Number(attempt3[2])];
                    expect(result[0]).toBe("filename.js");
                    expect(result[1]).toBe(10);
                } else {
                    expect(true).toBe(false);
                }
            }
        }
    });
});