import type { SVGProps } from "react";

export type IconName =
  | "revenue"
  | "target"
  | "sparkles"
  | "conversion"
  | "pipeline"
  | "brain"
  | "shield"
  | "cloud"
  | "database"
  | "flow"
  | "analytics"
  | "bolt"
  | "heart"
  | "chart"
  | "route"
  | "compass"
  | "mail"
  | "activity"
  | "dashboard"
  | "bell"
  | "magnet"
  | "briefcase"
  | "trophy"
  | "menu"
  | "close"
  | "arrow-right"
  | "arrow-up"
  | "arrow-up-right"
  | "check"
  | "check-circle"
  | "download"
  | "search"
  | "plus"
  | "pencil"
  | "trash"
  | "filter"
  | "user"
  | "users"
  | "calendar"
  | "phone"
  | "map-pin"
  | "clock"
  | "alert"
  | "info"
  | "star"
  | "trending-up"
  | "trending-down"
  | "layers"
  | "lock"
  | "globe"
  | "refresh"
  | "building"
  | "file-text"
  | "external"
  | "grid"
  | "brain-circuit"
  | "chevron-down"
  | "rep"
  | "manager"
  | "log-out"
  | "send";

const paths: Record<IconName, React.ReactNode> = {
  revenue: (
    <>
      <path d="M12 1.8v20.4" />
      <path d="M17 5.5H9.8a3.4 3.4 0 0 0 0 6.8h4.4a3.4 3.4 0 0 1 0 6.8H6" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3.5 13.6 8 18 9.6 13.6 11.2 12 15.7 10.4 11.2 6 9.6 10.4 8 12 3.5Z" />
      <path d="M18.5 15.5 19.3 17.6 21.4 18.4 19.3 19.2 18.5 21.3 17.7 19.2 15.6 18.4 17.7 17.6 18.5 15.5Z" />
      <path d="M5.5 2.5 6.1 4.2 7.8 4.8 6.1 5.4 5.5 7.1 4.9 5.4 3.2 4.8 4.9 4.2 5.5 2.5Z" />
    </>
  ),
  conversion: (
    <>
      <path d="M21 12a9 9 0 1 1-2.64-6.36" />
      <path d="M21 3.5V9h-5.5" />
    </>
  ),
  pipeline: (
    <>
      <path d="M3 4.5h18l-6.8 8.2v5.9L10 21v-8.3L3 4.5Z" />
      <path d="M7.5 8h9" />
    </>
  ),
  brain: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2.5" />
      <path d="M10 2.5v3.5M14 2.5v3.5M10 18v3.5M14 18v3.5M2.5 10H6M2.5 14H6M18 10h3.5M18 14h3.5" />
    </>
  ),
  "brain-circuit": (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5.2L12 2.3 4 5.2V12c0 6 8 10 8 10Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  cloud: <path d="M17.5 19a4.5 4.5 0 0 0 .5-8.97A6 6 0 0 0 6.2 9.3 4.5 4.5 0 0 0 7 19h10.5Z" />,
  database: (
    <>
      <ellipse cx="12" cy="5.5" rx="8" ry="3" />
      <path d="M4 5.5v13c0 1.66 3.58 3 8 3s8-1.34 8-3v-13" />
      <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
    </>
  ),
  flow: (
    <>
      <rect x="2.5" y="9" width="6" height="6" rx="1.5" />
      <rect x="15.5" y="3" width="6" height="6" rx="1.5" />
      <rect x="15.5" y="15" width="6" height="6" rx="1.5" />
      <path d="M8.5 12h3.5V6H15M12 12h3.5v6H15" />
    </>
  ),
  analytics: (
    <>
      <path d="M3 3v16.5h18" />
      <path d="M7.5 16V10M12 16V5.5M16.5 16v-8" />
    </>
  ),
  bolt: <path d="M13.5 2 4 13.5h7L10.5 22 20 10.5h-7L13.5 2Z" />,
  heart: (
    <path d="M12 20.5S3.5 15.4 3.5 9.6A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8.5 2.6c0 5.8-8.5 10.9-8.5 10.9Z" />
  ),
  chart: (
    <>
      <path d="M3 3v18h18" />
      <path d="m7 15 3.5-4.5 3 2.5L20 6.5" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="5.5" r="2.5" />
      <circle cx="6" cy="18.5" r="2.5" />
      <circle cx="18" cy="12" r="2.5" />
      <path d="M6 8v8M8.5 5.5H14a3.5 3.5 0 0 1 0 7h-4a3.5 3.5 0 0 0 0 7h5.5" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5.5-5.5 2 2-5.5 5.5-2Z" />
    </>
  ),
  mail: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  activity: <path d="M2.5 12h4l2.5-7 5 14 2.5-7h5" />,
  dashboard: (
    <>
      <rect x="3" y="3" width="7.5" height="7.5" rx="2" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" />
    </>
  ),
  bell: (
    <>
      <path d="M18 9a6 6 0 1 0-12 0c0 5-2 6.5-2 6.5h16S18 14 18 9Z" />
      <path d="M13.7 19.5a2 2 0 0 1-3.4 0" />
    </>
  ),
  magnet: (
    <>
      <path d="M6 3.5v8a6 6 0 0 0 12 0v-8" />
      <path d="M6 8.5h4M14 8.5h4" />
    </>
  ),
  briefcase: (
    <>
      <rect x="2.5" y="7" width="19" height="13" rx="2.5" />
      <path d="M8.5 7V5.5A2.5 2.5 0 0 1 11 3h2a2.5 2.5 0 0 1 2.5 2.5V7" />
      <path d="M2.5 12.5h19" />
    </>
  ),
  trophy: (
    <>
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 6H4.5A2.5 2.5 0 0 0 7 10.5M17 6h2.5A2.5 2.5 0 0 1 17 10.5" />
      <path d="M12 14v3.5M8.5 21h7l-.7-3.5H9.2L8.5 21Z" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </>
  ),
  close: (
    <>
      <path d="m6 6 12 12M18 6 6 18" />
    </>
  ),
  "arrow-right": (
    <>
      <path d="M4.5 12h15" />
      <path d="m13.5 6 6 6-6 6" />
    </>
  ),
  "arrow-up": (
    <>
      <path d="M12 19.5V5" />
      <path d="m6 11 6-6 6 6" />
    </>
  ),
  "arrow-up-right": (
    <>
      <path d="M7 17 17 7" />
      <path d="M8.5 7H17v8.5" />
    </>
  ),
  check: <path d="m5 13 4.5 4.5L19 7" />,
  "check-circle": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.2 2.4 2.4 4.6-4.8" />
    </>
  ),
  download: (
    <>
      <path d="M12 3.5v11" />
      <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
      <path d="M4 19.5h16" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  pencil: (
    <>
      <path d="M4 20h4.5L20 8.5 15.5 4 4 15.5V20Z" />
      <path d="m13.5 6 4.5 4.5" />
    </>
  ),
  trash: (
    <>
      <path d="M4 6.5h16" />
      <path d="M9 6.5V4.5h6v2" />
      <path d="M6.5 6.5 7.5 21h9l1-14.5" />
      <path d="M10 11v6M14 11v6" />
    </>
  ),
  filter: <path d="M3 5h18l-7 8v6l-4 2v-8L3 5Z" />,
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20.5a6.5 6.5 0 0 1 13 0" />
      <path d="M16 5.2a3.5 3.5 0 0 1 0 5.6M17.5 14.5a6.5 6.5 0 0 1 4 6" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
  ),
  "map-pin": (
    <>
      <path d="M20 10.2c0 5.8-8 11.8-8 11.8S4 16 4 10.2a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="2.8" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.4 2" />
    </>
  ),
  alert: (
    <>
      <path d="M10.3 3.9 2.4 17.5A2 2 0 0 0 4.1 20.5h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4M12 17h.01" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </>
  ),
  star: <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z" />,
  "trending-up": (
    <>
      <path d="m3 17 6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </>
  ),
  "trending-down": (
    <>
      <path d="m3 7 6 6 4-4 8 8" />
      <path d="M15 17h6v-6" />
    </>
  ),
  layers: (
    <>
      <path d="m12 2.5 9.5 5-9.5 5-9.5-5 9.5-5Z" />
      <path d="m2.5 12 9.5 5 9.5-5" />
      <path d="m2.5 16.5 9.5 5 9.5-5" />
    </>
  ),
  lock: (
    <>
      <rect x="4" y="10" width="16" height="11" rx="2.5" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" />
    </>
  ),
  refresh: (
    <>
      <path d="M21 12a9 9 0 1 1-2.64-6.36" />
      <path d="M21 3.5V9h-5.5" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" />
      <path d="M10 21v-3h4v3" />
    </>
  ),
  "file-text": (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </>
  ),
  external: (
    <>
      <path d="M14 4h6v6" />
      <path d="M20 4 10 14" />
      <path d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
    </>
  ),
  send: (
    <>
      <path d="M21.5 2.5 11 13" />
      <path d="M21.5 2.5 15 21.5l-4-8.5-8.5-4 19-6.5Z" />
    </>
  ),
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  "log-out": (
    <>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
    </>
  ),
  rep: (
    <>
      <circle cx="12" cy="6.5" r="3.5" />
      <path d="M5 21a7 7 0 0 1 14 0" />
      <path d="M17.5 3.5a3.5 3.5 0 0 1 0 6" />
    </>
  ),
  manager: (
    <>
      <path d="M3 3v16.5h18" />
      <path d="M7.5 16V10M12 16V5.5M16.5 16v-8" />
      <path d="M2 20.5 7 15l3.5 3L14 12l6 6.5" />
    </>
  ),
};

type Props = SVGProps<SVGSVGElement> & { name: IconName; filled?: boolean };

export function Icon({ name, filled, className, ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      fillRule="evenodd"
      clipRule="evenodd"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
