import { Q } from '../../q';

describe('Q.join', () => {
    it('should throw an error when the two promises are not implemented', () => {
        const promise1 = Q(5);
        const promise2 = Q(10);
        expect(() => Q.join(promise1, promise2)).toThrowError();
    });
});