import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should define property correctly', () => {
        var obj = {};
        var descriptor = { value: 'test', configurable: true };
        Q.object_defineProperty(obj, 'test', descriptor);
        expect(obj.test).toBe('test');
        delete obj.test;
        expect(obj.test).toBeUndefined();
    });
});