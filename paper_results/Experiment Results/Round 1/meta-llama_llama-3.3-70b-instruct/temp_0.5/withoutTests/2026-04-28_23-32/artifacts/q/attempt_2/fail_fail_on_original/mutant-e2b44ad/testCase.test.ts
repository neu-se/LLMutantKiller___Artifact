import { Q } from "../../../q";

describe('Q', () => {
    it('should handle process.domain correctly', () => {
        // The mutation changes the type check for process from "object" to "".
        // We can test this by checking if Q.done throws an error when process is not an object.
        const originalProcess = global.process;
        global.process = "";
        expect(() => Q.resolve().done()).toThrowError("Q.noConflict only works when Q is used as a global");
        global.process = originalProcess;
    });
});