import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should define property with value', () => {
        var obj = {};
        var prop = 'test';
        var descriptor = { value: 'testValue' };
        var object_defineProperty = Object.defineProperty || function (obj, prop, descriptor) {
            obj[prop] = descriptor.value;
            return obj;
        };
        object_defineProperty(obj, prop, descriptor);
        expect(obj[prop]).toBe('testValue');
    });
});