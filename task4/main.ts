/**
 * Iteratively sums numbers from 1 to n using a for loop.
 *
 * Complexity:
 *   - Time: O(n) — loops through n iterations.
 *   - Space: O(1) — uses a fixed amount of extra space.
 */
export function sum_to_n_a(n: number): number {
    if (n <= 0) {
        return 0
    }

    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}



/**
 * Recursively sums numbers from 1 to n.
 *
 * Complexity:
 *   - Time: O(n) — each recursive call decreases n by 1.
 *   - Space: O(n) — due to the call stack growing with each recursion.
 *
 * Note: This approach may lead to stack overflow for very large n.
 */
export function sum_to_n_b(n: number): number {
    if (n <= 0) {
        return 0
    }

    if (n === 1) return n;

    return n + sum_to_n_b(n - 1);
}


/**
 * Uses the mathematical formula to sum numbers from 1 to n: n*(n+1)/2.
 *
 * Complexity:
 *   - Time: O(1) — constant time computation.
 *   - Space: O(1) — uses a fixed amount of extra space.
 */
export function sum_to_n_c(n: number): number {
    if (n <= 0) {
        return 0
    }
    return (n * (n + 1)) / 2;
}

console.log(sum_to_n_a(5)); // Output: 15
console.log(sum_to_n_b(5)); // Output: 15
console.log(sum_to_n_c(5)); // Output: 15


