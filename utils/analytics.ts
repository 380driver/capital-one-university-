// Analytics utility for tracking user engagement and page metrics

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
}

class Analytics {
  private isEnabled: boolean;
  private gaId: string = 'G-YOUR_GA_ID'; // Replace with actual GA ID

  constructor() {
    this.isEnabled = typeof window !== 'undefined' && process.env.NODE_ENV === 'production';
  }

  // Initialize Google Analytics
  static initGA(measurementId: string) {
    if (typeof window !== 'undefined' && !window.gtag) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);

      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).gtag = function () {
        (window as any).dataLayer.push(arguments);
      };
      (window as any).gtag('js', new Date());
      (window as any).gtag('config', measurementId);
    }
  }

  // Track page view
  static trackPageView(pagePath: string, pageTitle: string) {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_path: pagePath,
        page_title: pageTitle
      });
    }
  }

  // Track custom event
  static trackEvent(eventName: string, properties?: Record<string, any>) {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, properties || {});
    }
  }

  // Track section viewed
  static trackSectionView(sectionName: string) {
    this.trackEvent('section_viewed', {
      section_name: sectionName,
      timestamp: new Date().toISOString()
    });
  }

  // Track interactive element
  static trackInteraction(elementName: string, action: string) {
    this.trackEvent('interaction', {
      element: elementName,
      action: action,
      timestamp: new Date().toISOString()
    });
  }

  // Track feature usage
  static trackFeatureUsage(featureName: string) {
    this.trackEvent('feature_used', {
      feature: featureName,
      timestamp: new Date().toISOString()
    });
  }

  // Track time on page
  static trackTimeOnPage(pageName: string, seconds: number) {
    this.trackEvent('time_on_page', {
      page: pageName,
      time_seconds: Math.round(seconds),
      timestamp: new Date().toISOString()
    });
  }
}

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export default Analytics;
