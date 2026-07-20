import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should define property with value and return the object', () => {
        var obj = {};
        var prop = 'test';
        var descriptor = { value: 'testValue' };
        var object_defineProperty = Object.defineProperty || function (obj, prop, descriptor) {
            obj[prop] = descriptor.value;
            return obj;
        };
        var result = object_defineProperty(obj, prop, descriptor);
        expect(result).toBe(obj);
    });
});