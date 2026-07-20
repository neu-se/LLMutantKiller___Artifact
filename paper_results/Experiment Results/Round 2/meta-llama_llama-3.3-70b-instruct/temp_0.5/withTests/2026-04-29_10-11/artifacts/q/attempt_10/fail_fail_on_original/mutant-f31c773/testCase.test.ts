import { Q } from '../../../../../../../../subject_repositories/q/q.js';

describe('Q.set', () => {
    it('should set a property on an object and return undefined', () => {
        const obj: any = {};
        const promise = Q(obj).set('test', 'value');
        return promise.then((result: any) => {
            expect(result).toBeUndefined();
            expect(obj.test).toBe('value');
        });
    });

    it('should reject if the object is a promise that is rejected', () => {
        const error = new Error('Test error');
        const promise = Q.reject(error).set('test', 'value');
        return promise.then(() => {
            expect(true).toBe(false);
        }, (err: any) => {
            expect(err).toBe(error);
        });
    });

    it('should set the property with the correct value and key', () => {
        const obj: any = {};
        const promise = Q(obj).set('test', 'value');
        return promise.then((result: any) => {
            expect(result).toBeUndefined();
            expect(obj.test).toBe('value');
            expect(Object.keys(obj)).toEqual(['test']);
        });
    });

    it('should throw an error when no arguments are provided in the mutated code', () => {
        const obj: any = {};
        const promise = Q(obj).set();
        return promise.then(() => {
            expect(true).toBe(false);
        }, (err: any) => {
            expect(err).toBeInstanceOf(Error);
        });
    });
});