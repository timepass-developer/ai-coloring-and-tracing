// lib/guest-usage.ts
const MAX_FREE_GUEST_GENERATIONS = 2;

function emitGuestUpdate() {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(new CustomEvent("guestGenerationsUpdated"));
  } catch {
    // no-op if CustomEvent not supported
  }
}

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
  emitGuestUpdate();
}

/**
 * Reset free usage (after login)
 */
export function resetGuestGenerations() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("guestGenerations");
  emitGuestUpdate();
}

/**
 * Check if guest has reached free usage limit
 */
export function hasReachedGuestLimit() {
  return getGuestGenerations() >= MAX_FREE_GUEST_GENERATIONS;
}

/**
 * Remaining free generations a guest can use today
 */
export function getGuestGenerationsRemaining() {
  if (typeof window === "undefined") return MAX_FREE_GUEST_GENERATIONS;
  return Math.max(0, MAX_FREE_GUEST_GENERATIONS - getGuestGenerations());
}

export const GUEST_GENERATION_LIMIT = MAX_FREE_GUEST_GENERATIONS;
