import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should define property correctly', () => {
        var obj = {};
        var descriptor = { value: 'test', configurable: true, enumerable: true };
        Q.object_defineProperty(obj, 'test', descriptor);
        expect(Object.prototype.hasOwnProperty.call(obj, 'test')).toBe(true);
    });
});