import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const formatDate = (time: string | undefined): string =>
  time ? dayjs(time).format('DD MMM YYYY') : '';

export const fromNow = (time: string): string => dayjs(time).fromNow();
