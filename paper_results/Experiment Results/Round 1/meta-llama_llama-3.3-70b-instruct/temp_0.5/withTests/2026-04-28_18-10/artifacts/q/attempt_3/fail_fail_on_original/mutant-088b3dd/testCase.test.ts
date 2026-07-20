import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly parse the filename and line number from a stack line", () => {
        const promise = Q.reject(new Error());
        return promise.catch(error => {
            const stack = error.stack;
            const lines = stack.split("\n");
            const line = lines[2];
            const attempt1 = /at .+ \((.+):(\d):(?:\d+)\)$/.exec(line);
            expect(attempt1).not.toBeNull();
        });
    });
});