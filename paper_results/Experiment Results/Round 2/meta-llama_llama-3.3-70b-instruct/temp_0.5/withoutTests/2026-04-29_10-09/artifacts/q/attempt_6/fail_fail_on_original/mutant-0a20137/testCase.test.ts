import { Q } from "../../../q/q";

describe('Q.join', () => {
    it('should return a promise when two promises are joined', () => {
        const promise1 = Q(5);
        const promise2 = Q(5);
        expect(Q.join(promise1, promise2)).toBeInstanceOf(Promise);
    });
});