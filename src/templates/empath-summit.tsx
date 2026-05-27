import { TemplateConfig, TemplateRenderProps } from './types';

const GRADIENT = `
  radial-gradient(ellipse at 82% 2%, rgba(80, 215, 185, 0.55) 0%, transparent 45%),
  radial-gradient(ellipse at 95% 0%, rgba(100, 230, 200, 0.35) 0%, transparent 30%),
  radial-gradient(ellipse at 50% 45%, rgba(210, 218, 245, 0.85) 0%, transparent 55%),
  radial-gradient(ellipse at 15% 90%, rgba(195, 175, 225, 0.4) 0%, transparent 45%),
  radial-gradient(ellipse at 60% 95%, rgba(210, 195, 235, 0.3) 0%, transparent 40%),
  linear-gradient(155deg, #cfc0e6 0%, #c8d4f2 20%, #b6dce8 42%, #c4d4ee 62%, #d2c8e8 82%, #ccc0e0 100%)
`;

const FONT = 'var(--font-dm-sans), system-ui, sans-serif';
const BLUE = '#4c5ba8';
const DARK = '#242b4f';
const PURPLE_CIRCLE = '#6858B8';
const F = 1.15;

function HeadshotCircle({ src, circleSize, backingSize, offsetX, offsetY }: {
  src: string; circleSize: number; backingSize: number;
  offsetX: number; offsetY: number;
}) {
  const imgOffset = (backingSize - circleSize) / 2;
  return (
    <div style={{ position: 'relative', width: backingSize, height: backingSize }}>
      <div style={{
        width: backingSize,
        height: backingSize,
        borderRadius: '50%',
        backgroundColor: PURPLE_CIRCLE,
        position: 'absolute',
        top: offsetY,
        left: offsetX,
      }} />
      {src ? (
        <img
          alt=""
          src={src}
          style={{
            width: circleSize,
            height: circleSize,
            borderRadius: '50%',
            objectFit: 'cover',
            position: 'absolute',
            top: imgOffset - offsetY,
            left: imgOffset - offsetX,
          }}
        />
      ) : (
        <div style={{
          width: circleSize,
          height: circleSize,
          borderRadius: '50%',
          backgroundColor: '#E5E7EB',
          position: 'absolute',
          top: imgOffset,
          left: imgOffset,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#9CA3AF',
          fontSize: circleSize * 0.06,
          fontFamily: FONT,
        }}>
          Upload Photo
        </div>
      )}
    </div>
  );
}

function SquareLayout({ data, settings, size }: TemplateRenderProps) {
  const { width, height } = size;
  const s = width / 1080;

  const headshot = data.headshot || '';
  const name = data.name || 'Speaker Name';
  const title = data.title || '';
  const eventName = settings.eventName || '';
  const eventDetails = settings.eventDetails || '';
  const topLine = settings.topLine || '';

  return (
    <div style={{
      width, height,
      background: GRADIENT,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: FONT,
      position: 'relative',
      overflow: 'hidden',
      padding: `${55 * s}px 0 ${70 * s}px`,
    }}>
      <div style={{
        fontSize: 26 * F * s,
        letterSpacing: '0.22em',
        color: BLUE,
        textTransform: 'uppercase',
        fontWeight: 700,
        marginBottom: 6 * s,
      }}>
        {topLine}
      </div>

      <div style={{
        fontSize: 64.9 * F * s,
        fontWeight: 700,
        lineHeight: 1.05,
        marginBottom: 2 * s,
        textAlign: 'center',
        padding: `0 ${24 * s}px`,
        background: 'linear-gradient(to right, #334189, #7d7aed)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        {eventName}
      </div>

      <div style={{
        fontSize: 26.9 * F * s,
        color: BLUE,
        marginBottom: 32 * s,
        textAlign: 'center',
        padding: `0 ${40 * s}px`,
        fontWeight: 400,
      }}>
        {eventDetails}
      </div>

      <div style={{ marginBottom: 24 * s }}>
        <HeadshotCircle
          src={headshot}
          circleSize={350 * s}
          backingSize={386 * s}
          offsetX={0}
          offsetY={0}
        />
      </div>

      <div style={{
        fontSize: 44 * F * s,
        fontWeight: 600,
        color: DARK,
        marginBottom: 6 * s,
        textAlign: 'center',
        padding: `0 ${40 * s}px`,
        lineHeight: 1.15,
      }}>
        {name}
      </div>

      <div style={{
        fontSize: 20 * F * s,
        color: BLUE,
        textAlign: 'center',
        lineHeight: 1.55,
        whiteSpace: 'pre-line',
        padding: `0 ${60 * s}px`,
        fontWeight: 400,
      }}>
        {title}
      </div>
    </div>
  );
}

function LandscapeLayout({ data, settings, size }: TemplateRenderProps) {
  const { width, height } = size;
  const sx = width / 1200;
  const sy = height / 630;

  const headshot = data.headshot || '';
  const name = data.name || 'Speaker Name';
  const title = data.title || '';
  const eventName = settings.eventName || '';
  const eventDetails = settings.eventDetails || '';
  const topLine = settings.topLine || '';

  return (
    <div style={{
      width, height,
      background: GRADIENT,
      display: 'flex',
      alignItems: 'center',
      padding: `0 ${60 * sx}px`,
      gap: 50 * sx,
      fontFamily: FONT,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 * sy }}>
        <div style={{
          fontSize: 16 * F * sx,
          letterSpacing: '0.22em',
          color: BLUE,
          textTransform: 'uppercase',
          fontWeight: 700,
        }}>
          {topLine}
        </div>
        <div style={{
          fontSize: 42 * F * sx,
          fontWeight: 700,
          lineHeight: 1.05,
          background: 'linear-gradient(to right, #334189, #7d7aed)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          {eventName}
        </div>
        <div style={{
          fontSize: 17 * F * sx,
          color: BLUE,
          lineHeight: 1.4,
        }}>
          {eventDetails}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 * sy }}>
        <HeadshotCircle
          src={headshot}
          circleSize={250 * sy}
          backingSize={278 * sy}
          offsetX={0}
          offsetY={0}
        />
        <div style={{
          fontSize: 28 * F * sy,
          fontWeight: 600,
          color: DARK,
          textAlign: 'center',
        }}>
          {name}
        </div>
        <div style={{
          fontSize: 14 * F * sy,
          color: BLUE,
          textAlign: 'center',
          lineHeight: 1.45,
          whiteSpace: 'pre-line',
          maxWidth: 320 * sx,
        }}>
          {title}
        </div>
      </div>
    </div>
  );
}

function EmPATHSummitCanvas(props: TemplateRenderProps) {
  const isSquare = props.size.width === props.size.height;
  return isSquare ? <SquareLayout {...props} /> : <LandscapeLayout {...props} />;
}

export const empathSummitTemplate: TemplateConfig = {
  id: 'empath-summit',
  name: 'EmPATH Summit',
  description: 'Speaker announcement card with gradient background and circular headshot',
  category: 'Conference',
  fields: [
    { id: 'headshot', label: 'Headshot', type: 'image', perEntry: true, required: true },
    { id: 'name', label: 'Name', type: 'text', placeholder: 'Dr. Jane Smith', perEntry: true, required: true },
    { id: 'title', label: 'Title / Role', type: 'textarea', placeholder: 'Vice President of Emergency Medicine\nat Vituity', perEntry: true },
    { id: 'eventName', label: 'Event Name', type: 'text', perEntry: false, defaultValue: 'EmPATH Summit 2026' },
    { id: 'eventDetails', label: 'Event Details', type: 'text', perEntry: false, defaultValue: 'May 12–13 at the Hyatt Regency, Salt Lake City, UT' },
    { id: 'topLine', label: 'Top Line Text', type: 'text', perEntry: false, defaultValue: 'I WILL BE SPEAKING AT' },
  ],
  sizes: [
    { id: 'square', label: 'Square (1080×1080)', width: 1080, height: 1080 },
    { id: 'landscape', label: 'Landscape (1200×630)', width: 1200, height: 630 },
  ],
  defaultSettings: {
    eventName: 'EmPATH Summit 2026',
    eventDetails: 'May 12–13 at the Hyatt Regency, Salt Lake City, UT',
    topLine: 'I WILL BE SPEAKING AT',
  },
  component: EmPATHSummitCanvas,
};
