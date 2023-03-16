import Cart from '../';
import { test, expect } from 'vitest';

test('properly increments the cart items', () => {
    const cart = new Cart();
    expect(cart.increment(1)).toBe(2);
});

