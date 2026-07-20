import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should capture line number correctly', () => {
        const originalCode = () => {
            try {
                throw new Error();
            } catch (e: any) {
                const lines = e.stack.split("\n");
                const firstLine = lines[0];
                const fileNameAndLineNumber = /at (.+):(\d+):(\d+)/.exec(firstLine);
                if (!fileNameAndLineNumber) {
                    return true;
                }
                return false;
            }
        };

        expect(originalCode()).toBe(false);
    });
});