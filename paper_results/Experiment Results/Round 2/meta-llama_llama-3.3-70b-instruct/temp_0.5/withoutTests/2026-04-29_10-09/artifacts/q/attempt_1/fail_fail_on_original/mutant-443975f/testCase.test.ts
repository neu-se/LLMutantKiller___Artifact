import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should use setImmediate when available', () => {
        const originalSetImmediate = global.setImmediate;
        global.setImmediate = jest.fn();
        const q = Q(1);
        q.then(() => {});
        expect(global.setImmediate).toHaveBeenCalledTimes(1);
        global.setImmediate = originalSetImmediate;
    });
});