// Web Vitals and Performance Monitoring
interface MetricData {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta?: number;
}

type ReportHandler = (metric: MetricData) => void;

/**
 * Measures Core Web Vitals (LCP, FID, CLS) and other performance metrics
 */
export const reportWebVitals = (onReport: ReportHandler) => {
  // Largest Contentful Paint (LCP)
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        const lcp = lastEntry.renderTime || lastEntry.loadTime;
        
        onReport({
          name: 'LCP',
          value: lcp,
          rating: lcp < 2500 ? 'good' : lcp < 4000 ? 'needs-improvement' : 'poor'
        });
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.debug('LCP observer not supported');
    }

    // Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            const firstSessionEntry = clsValue + (entry as any).value;
            clsValue = firstSessionEntry;
          }
        }
        
        onReport({
          name: 'CLS',
          value: parseFloat(clsValue.toFixed(4)),
          rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor'
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.debug('CLS observer not supported');
    }

    // First Input Delay (FID) - Note: Using Interaction to Next Paint (INP) as modern alternative
    try {
      const inpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        const inp = lastEntry.processingDuration;
        
        onReport({
          name: 'INP',
          value: inp,
          rating: inp < 200 ? 'good' : inp < 500 ? 'needs-improvement' : 'poor'
        });
      });
      inpObserver.observe({ entryTypes: ['interaction'] });
    } catch (e) {
      console.debug('INP observer not supported');
    }
  }

  // Navigation Timing
  if (document.readyState === 'complete') {
    reportNavigationTiming();
  } else {
    window.addEventListener('load', reportNavigationTiming);
  }

  function reportNavigationTiming() {
    const navigation = performance.getEntriesByType('navigation')[0] as any;
    if (navigation) {
      const ttfb = navigation.responseStart - navigation.fetchStart;
      const fcp = performance.getEntriesByType('paint').find(p => p.name === 'first-contentful-paint');
      
      onReport({
        name: 'TTFB',
        value: ttfb,
        rating: ttfb < 600 ? 'good' : ttfb < 1800 ? 'needs-improvement' : 'poor'
      });

      if (fcp) {
        onReport({
          name: 'FCP',
          value: fcp.startTime,
          rating: fcp.startTime < 1800 ? 'good' : fcp.startTime < 3000 ? 'needs-improvement' : 'poor'
        });
      }
    }
  }
};

/**
 * Simple performance timer utility
 */
export const createTimer = (label: string) => {
  const start = performance.now();
  return {
    end: () => {
      const duration = performance.now() - start;
      console.debug(`⏱️ ${label}: ${duration.toFixed(2)}ms`);
      return duration;
    }
  };
};

/**
 * Track memory usage (if supported)
 */
export const getMemoryUsage = () => {
  if ((performance as any).memory) {
    const memory = (performance as any).memory;
    return {
      usedJSHeapSize: Math.round(memory.usedJSHeapSize / 1048576), // MB
      totalJSHeapSize: Math.round(memory.totalJSHeapSize / 1048576), // MB
      jsHeapSizeLimit: Math.round(memory.jsHeapSizeLimit / 1048576) // MB
    };
  }
  return null;
};

/**
 * Log performance metrics to console
 */
export const initPerformanceMonitoring = () => {
  if (process.env.NODE_ENV === 'development') {
    reportWebVitals((metric) => {
      const icon = metric.rating === 'good' ? '✅' : metric.rating === 'needs-improvement' ? '⚠️' : '❌';
      console.debug(`${icon} ${metric.name}: ${metric.value.toFixed(2)}ms`);
    });
  }
};

export default {
  reportWebVitals,
  createTimer,
  getMemoryUsage,
  initPerformanceMonitoring
};
