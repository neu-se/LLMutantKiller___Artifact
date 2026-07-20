import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should define property with value and configurable descriptor', () => {
        var obj = {};
        var prop = 'test';
        var descriptor = { value: 'testValue', configurable: true };
        var object_defineProperty = Object.defineProperty || function (obj, prop, descriptor) {
            obj[prop] = descriptor.value;
            return obj;
        };
        object_defineProperty(obj, prop, descriptor);
        delete obj[prop];
        expect(obj).not.toHaveProperty(prop);
    });
});