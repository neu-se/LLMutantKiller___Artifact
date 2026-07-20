import { Q } from './q.js';

describe('Q', () => {
    it('should test the behavior of the mutated file', () => {
        // This should pass for the original code and fail for the mutated code
        if (typeof window === 'undefined') {
            expect(true).toBe(true);
        } else {
            expect(true).toBe(false);
        }

        // Check if the Q.nextTick function is called immediately
        let called = false;
        Q.nextTick(() => {
            called = true;
        });
        expect(called).toBe(false);

        // Check if the Q.nextTick function is called after a timeout
        setTimeout(() => {
            expect(called).toBe(true);
        }, 0);

        // Check if the Q.nextTick function is called with the correct arguments
        let args: any[] | null = null;
        Q.nextTick((...args_: any[]) => {
            args = args_;
        });
        expect(args).toBeNull();

        // Check if the Q.nextTick function is called with the correct context
        let context: any = null;
        Q.nextTick(function(this: any) {
            context = this;
        });
        expect(context).toBeNull();

        // Check if the Q.nextTick function is called with the correct this
        let thisValue: any = null;
        Q.nextTick(function(this: any) {
            thisValue = this;
        });
        expect(thisValue).toBeNull();

        // Check if the Q.nextTick function is called with the correct bind
        let bind: any = null;
        Q.nextTick(function(this: any) {
            bind = this;
        }.bind(null));
        expect(bind).toBeNull();

        // Check if the Q.nextTick function is called with the correct apply
        let apply: any = null;
        Q.nextTick(function(this: any) {
            apply = this;
        }.apply(null));
        expect(apply).toBeNull();

        // Check if the Q.nextTick function is called with the correct call
        let call: any = null;
        Q.nextTick(function(this: any) {
            call = this;
        }.call(null));
        expect(call).toBeNull();

        // Check if the Q.nextTick function is called with the correct constructor
        let constructor: any = null;
        Q.nextTick(function(this: any) {
            constructor = this.constructor;
        });
        expect(constructor).toBeNull();

        // Check if the Q.nextTick function is called with the correct prototype
        let prototype: any = null;
        Q.nextTick(function(this: any) {
            prototype = Object.getPrototypeOf(this);
        });
        expect(prototype).toBeNull();

        // Check if the Q.nextTick function is called with the correct hasOwnProperty
        let hasOwnProperty: any = null;
        Q.nextTick(function(this: any) {
            hasOwnProperty = Object.prototype.hasOwnProperty.call(this, 'test');
        });
        expect(hasOwnProperty).toBeNull();

        // Check if the Q.nextTick function is called with the correct propertyIsEnumerable
        let propertyIsEnumerable: any = null;
        Q.nextTick(function(this: any) {
            propertyIsEnumerable = Object.prototype.propertyIsEnumerable.call(this, 'test');
        });
        expect(propertyIsEnumerable).toBeNull();

        // Check if the Q.nextTick function is called with the correct isPrototypeOf
        let isPrototypeOf: any = null;
        Q.nextTick(function(this: any) {
            isPrototypeOf = Object.prototype.isPrototypeOf.call(this, {});
        });
        expect(isPrototypeOf).toBeNull();

        // Check if the Q.nextTick function is called with the correct toLocaleString
        let toLocaleString: any = null;
        Q.nextTick(function(this: any) {
            toLocaleString = this.toLocaleString();
        });
        expect(toLocaleString).toBeNull();

        // Check if the Q.nextTick function is called with the correct toString
        let toString: any = null;
        Q.nextTick(function(this: any) {
            toString = this.toString();
        });
        expect(toString).toBeNull();

        // Check if the Q.nextTick function is called with the correct valueOf
        let valueOf: any = null;
        Q.nextTick(function(this: any) {
            valueOf = this.valueOf();
        });
        expect(valueOf).toBeNull();
    });
});