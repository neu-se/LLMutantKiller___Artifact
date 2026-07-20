import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should capture line number correctly', () => {
        const qFileName = (function () {
            try {
                throw new Error();
            } catch (e) {
                const lines = e.stack.split("\n");
                const firstLine = lines[0];
                const fileNameAndLineNumber = /at (.+):(\d+):(\d+)/.exec(firstLine);
                if (!fileNameAndLineNumber) {
                    return false;
                }
                return true;
            }
        })();
        expect(qFileName).toBe(true);
    });
});