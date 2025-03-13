/**
 * URL utilities for the web viewer
 */

// Check if a string is a valid URL
export function isValidUrl(urlString: string): boolean {
  try {
    // Try to create a URL object - this will throw if invalid
    new URL(urlString);
    return true;
  } catch (e) {
    // Check if adding https:// would make it valid
    try {
      new URL(`https://${urlString}`);
      return true;
    } catch (e) {
      return false;
    }
  }
}

// Check if the string looks like a domain (e.g., example.com)
export function looksLikeDomain(input: string): boolean {
  // Simple regex to check if it looks like a domain
  // This matches strings like: example.com, sub.domain.co.uk, etc.
  const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
  return domainRegex.test(input);
}

// Format a URL string (add protocol if missing)
export function formatUrl(urlString: string): string {
  if (!urlString) return '';
  
  // If it already has a protocol, return as is
  if (urlString.startsWith('http://') || urlString.startsWith('https://')) {
    return urlString;
  }
  
  // If it looks like a domain, add https://
  if (looksLikeDomain(urlString)) {
    return `https://${urlString}`;
  }
  
  // Otherwise, it's probably a search query
  return createSearchUrl(urlString);
}

// Create a search URL from a query string
export function createSearchUrl(query: string): string {
  // Encode the query for use in a URL
  const encodedQuery = encodeURIComponent(query);
  return `https://www.google.com/search?q=${encodedQuery}`;
}
