import { useState, useEffect, useCallback } from 'react';
import { StateData, TIME_ZONE_DEFINITIONS, TimeZoneCategory } from '../data/usStatesData';

export interface FormattedTime {
  timeStr: string;
  timeWithSeconds: string;
  timeOnly: string;
  period: string;
  hour24: string;
  minute: string;
  second: string;
  dayPeriod: 'day' | 'night' | 'twilight';
  tzAbbr: string;
  formattedDate: string;
}

export function useLiveClock(is24Hour: boolean = false) {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    // Tick every 1000ms
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatStateTime = useCallback((state: StateData): FormattedTime => {
    try {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: state.iana,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: !is24Hour,
        timeZoneName: 'short'
      });

      const parts = formatter.formatToParts(now);
      const hourPart = parts.find(p => p.type === 'hour')?.value || '12';
      const minutePart = parts.find(p => p.type === 'minute')?.value || '00';
      const secondPart = parts.find(p => p.type === 'second')?.value || '00';
      const dayPeriodPart = parts.find(p => p.type === 'dayPeriod')?.value || '';
      const tzNamePart = parts.find(p => p.type === 'timeZoneName')?.value || state.timeZone;

      // Calculate 24h hour for day/night icon
      const hour24Num = parseInt(
        new Intl.DateTimeFormat('en-US', {
          timeZone: state.iana,
          hour: 'numeric',
          hour12: false
        }).format(now),
        10
      );

      let dayPeriod: 'day' | 'night' | 'twilight' = 'day';
      if (hour24Num >= 21 || hour24Num < 5) {
        dayPeriod = 'night';
      } else if ((hour24Num >= 5 && hour24Num < 7) || (hour24Num >= 18 && hour24Num < 21)) {
        dayPeriod = 'twilight';
      }

      const dateStr = new Intl.DateTimeFormat('en-US', {
        timeZone: state.iana,
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      }).format(now);

      const timeStr = is24Hour
        ? `${hourPart.padStart(2, '0')}:${minutePart}`
        : `${hourPart}:${minutePart} ${dayPeriodPart}`;

      const timeWithSeconds = is24Hour
        ? `${hourPart.padStart(2, '0')}:${minutePart}:${secondPart}`
        : `${hourPart}:${minutePart}:${secondPart} ${dayPeriodPart}`;

      return {
        timeStr,
        timeWithSeconds,
        timeOnly: `${hourPart}:${minutePart}`,
        period: dayPeriodPart,
        hour24: hour24Num.toString().padStart(2, '0'),
        minute: minutePart,
        second: secondPart,
        dayPeriod,
        tzAbbr: tzNamePart,
        formattedDate: dateStr
      };
    } catch {
      // Fallback
      return {
        timeStr: '--:--',
        timeWithSeconds: '--:--:--',
        timeOnly: '--:--',
        period: '',
        hour24: '12',
        minute: '00',
        second: '00',
        dayPeriod: 'day',
        tzAbbr: state.timeZone,
        formattedDate: ''
      };
    }
  }, [now, is24Hour]);

  const getTimeZoneLiveTime = useCallback((tzKey: TimeZoneCategory): FormattedTime => {
    const tzDef = TIME_ZONE_DEFINITIONS[tzKey];
    try {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: tzDef.ianaSample,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: !is24Hour,
        timeZoneName: 'short'
      });

      const parts = formatter.formatToParts(now);
      const hourPart = parts.find(p => p.type === 'hour')?.value || '12';
      const minutePart = parts.find(p => p.type === 'minute')?.value || '00';
      const secondPart = parts.find(p => p.type === 'second')?.value || '00';
      const dayPeriodPart = parts.find(p => p.type === 'dayPeriod')?.value || '';
      const tzNamePart = parts.find(p => p.type === 'timeZoneName')?.value || tzDef.standardAbbr;

      const hour24Num = parseInt(
        new Intl.DateTimeFormat('en-US', {
          timeZone: tzDef.ianaSample,
          hour: 'numeric',
          hour12: false
        }).format(now),
        10
      );

      let dayPeriod: 'day' | 'night' | 'twilight' = 'day';
      if (hour24Num >= 21 || hour24Num < 5) {
        dayPeriod = 'night';
      } else if ((hour24Num >= 5 && hour24Num < 7) || (hour24Num >= 18 && hour24Num < 21)) {
        dayPeriod = 'twilight';
      }

      const dateStr = new Intl.DateTimeFormat('en-US', {
        timeZone: tzDef.ianaSample,
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      }).format(now);

      return {
        timeStr: is24Hour ? `${hourPart.padStart(2, '0')}:${minutePart}` : `${hourPart}:${minutePart} ${dayPeriodPart}`,
        timeWithSeconds: is24Hour ? `${hourPart.padStart(2, '0')}:${minutePart}:${secondPart}` : `${hourPart}:${minutePart}:${secondPart} ${dayPeriodPart}`,
        timeOnly: `${hourPart}:${minutePart}`,
        period: dayPeriodPart,
        hour24: hour24Num.toString().padStart(2, '0'),
        minute: minutePart,
        second: secondPart,
        dayPeriod,
        tzAbbr: tzNamePart,
        formattedDate: dateStr
      };
    } catch {
      return {
        timeStr: '--:--',
        timeWithSeconds: '--:--:--',
        timeOnly: '--:--',
        period: '',
        hour24: '12',
        minute: '00',
        second: '00',
        dayPeriod: 'day',
        tzAbbr: tzDef.standardAbbr,
        formattedDate: ''
      };
    }
  }, [now, is24Hour]);

  return {
    now,
    formatStateTime,
    getTimeZoneLiveTime
  };
}
