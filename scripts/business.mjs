export function validateBusiness(business) {
  const fail = text => { throw new Error(`Business configuration: ${text}`); };
  for (const field of ['name', 'address', 'prices']) if (typeof business[field] !== 'string' || !business[field].trim()) fail(`${field} must be text`);
  if (business.phone !== null && !/^\+[1-9]\d{7,14}$/.test(business.phone)) fail('phone must be an international +number');
  if (business.instagram !== null && !/^[A-Za-z0-9._]{1,30}$/.test(business.instagram)) fail('Instagram must be a username');
  for (const field of ['siteUrl', 'googleProfile']) if (business[field]) {
    const url = new URL(business[field]);
    if (url.protocol !== 'https:' || url.username || url.password) fail(`${field} must be a credential-free HTTPS URL`);
    if (field === 'siteUrl' && url.origin !== business[field].replace(/\/$/, '')) fail('siteUrl must be an origin without a path');
  }
  if (!Array.isArray(business.services) || !Array.isArray(business.reviews)) fail('services and reviews must be arrays');
  for (const service of business.services) if (typeof service.name !== 'string' || !service.name.trim() || typeof service.description !== 'string') fail('each confirmed service needs a name and description');
  for (const review of business.reviews) if (typeof review.name !== 'string' || typeof review.text !== 'string' || !review.text.trim()) fail('each supplied review needs a name and text');
  if (business.geo && (!Number.isFinite(business.geo.latitude) || Math.abs(business.geo.latitude) > 90 || !Number.isFinite(business.geo.longitude) || Math.abs(business.geo.longitude) > 180)) fail('coordinates are outside their valid ranges');
  if (business.googleRating !== null && (!Number.isFinite(business.googleRating) || business.googleRating < 1 || business.googleRating > 5)) fail('rating must be 1–5');
  if (business.googleReviewCount !== null && (!Number.isInteger(business.googleReviewCount) || business.googleReviewCount < 1)) fail('review count must be a positive integer');
  if (business.openedYear !== null && business.openedYear !== undefined && (!Number.isInteger(business.openedYear) || business.openedYear < 1900 || business.openedYear > new Date().getFullYear())) fail('opening year is invalid');
  const days = new Set(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
  for (const hours of business.openingHoursSchema ?? []) {
    if (hours['@type'] !== 'OpeningHoursSpecification' || !Array.isArray(hours.dayOfWeek) || !hours.dayOfWeek.every(day => days.has(day))) fail('structured hours need real weekdays');
    for (const field of ['opens', 'closes']) if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(hours[field])) fail('structured hours must use HH:MM');
  }
}
