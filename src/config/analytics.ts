// src/config/analytics.ts
const GOOGLE_ANALYTICS_ID = 'G-VZ8NCLGLS5';

export function getGoogleAnalyticsId() {
	if (typeof window !== 'undefined') {
		const host = window.location.hostname;
		if (host === 'localhost' || host === '127.0.0.1') {
			return '';
		}
	}
	return GOOGLE_ANALYTICS_ID;
}
