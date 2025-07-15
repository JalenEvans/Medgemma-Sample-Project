/**
 * Append a new token to existing text with spacing.
 * Adds a space before the token only if existing text is non-empty.
 * 
 * @param currentText - The existing accumulated text
 * @param newToken - The new token to append
 * @returns Updated text with spacing handled
 */
export function appendTokenWithSpace(currentText: string, newToken: string): string {
  return currentText ? `${currentText} ${newToken}` : newToken;
}