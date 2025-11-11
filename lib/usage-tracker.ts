// lib/guest-usage.ts
const MAX_FREE_GUEST_GENERATIONS = 2;

/**
 * Get how many free generations a guest has used
 */
export function getGuestGenerations() {
  if (typeof window === "undefined") return 0;
  return parseInt(localStorage.getItem("guestGenerations") || "0", 10);
}

/**
 * Increment the guest generation counter
 */
export function incrementGuestGenerations() {
  if (typeof window === "undefined") return;
  const count = getGuestGenerations() + 1;
  localStorage.setItem("guestGenerations", count.toString());
}

/**
 * Reset free usage (after login)
 */
export function resetGuestGenerations() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("guestGenerations");
}

/**
 * Check if guest has reached free usage limit
 */
export function hasReachedGuestLimit() {
  return getGuestGenerations() >= MAX_FREE_GUEST_GENERATIONS;
}
