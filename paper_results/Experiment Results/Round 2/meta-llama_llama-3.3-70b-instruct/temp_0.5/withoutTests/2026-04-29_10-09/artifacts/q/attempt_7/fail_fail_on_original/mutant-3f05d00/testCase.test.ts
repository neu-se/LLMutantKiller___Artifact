import { Q } from './q';

describe('Q', () => {
    it('should have a "finally" method on the Promise prototype', () => {
        const promise = Q.resolve();
        expect(promise.finally).toBeInstanceOf(Function);
    });
});