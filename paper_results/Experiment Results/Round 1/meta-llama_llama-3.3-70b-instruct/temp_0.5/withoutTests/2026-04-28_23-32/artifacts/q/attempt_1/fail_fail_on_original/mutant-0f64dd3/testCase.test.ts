import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should capture line number correctly', () => {
        try {
            throw new Error();
        } catch (e) {
            const errorStack = e.stack;
            const lines = errorStack.split("\n");
            const firstLine = lines[0];
            const fileNameAndLineNumber = /at (.+):(\d+):(\d+)/.exec(firstLine);
            expect(fileNameAndLineNumber).toBeTruthy();
        }
    });
});