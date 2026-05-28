import { TemplateConfig, TemplateRenderProps } from './types';

const FONT = 'var(--font-source-sans), system-ui, sans-serif';

const DARK_BG = '#0E0A1A';
const GRADIENT_TEXT = 'linear-gradient(to right, #F07A2D, #E83E75, #8B3FA0)';
const GRADIENT_BORDER = 'linear-gradient(135deg, #F07A2D, #E83E75, #8B3FA0)';
const WHITE = '#FFFFFF';
const LIGHT_GRAY = '#C8C0D4';

function GradientCircleBorder({ src, size, borderWidth, s }: {
  src: string; size: number; borderWidth: number; s: number;
}) {
  const outerSize = size + borderWidth * 2;
  return (
    <div style={{
      width: outerSize,
      height: outerSize,
      borderRadius: '50%',
      background: GRADIENT_BORDER,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}>
      {src ? (
        <img
          alt=""
          src={src}
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
      ) : (
        <div style={{
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: '#1A1230',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#6B5F80',
          fontSize: 14 * s,
          fontFamily: FONT,
        }}>
          Upload Photo
        </div>
      )}
    </div>
  );
}

function DiamondShape({ size, x, y, rotate }: {
  size: number; x: number; y: number; rotate: number;
}) {
  return (
    <div style={{
      position: 'absolute',
      left: x,
      top: y,
      width: size,
      height: size,
      transform: `rotate(${rotate}deg)`,
      background: 'linear-gradient(135deg, rgba(240,122,45,0.55) 0%, rgba(232,62,117,0.45) 40%, rgba(139,63,160,0.55) 100%)',
      borderRadius: size * 0.12,
      border: '1.5px solid rgba(232,62,117,0.4)',
    }} />
  );
}

function SquareLayout({ data, settings, size }: TemplateRenderProps) {
  const { width, height } = size;
  const s = width / 1080;

  const headshot = data.headshot || '';
  const name = data.name || 'Speaker Name';
  const title = data.title || '';
  const eventName = settings.eventName || '';
  const eventSubtitle = settings.eventSubtitle || '';
  const eventDetails = settings.eventDetails || '';
  const topLine = settings.topLine || '';

  return (
    <div style={{
      width, height,
      backgroundColor: DARK_BG,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: FONT,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top gradient accent bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 6 * s,
        background: 'linear-gradient(to right, #F07A2D, #E83E75, #8B3FA0)',
      }} />

      {/* Bottom gradient bar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 28 * s,
        background: 'linear-gradient(to right, #F07A2D, #E83E75, #8B3FA0)',
      }} />

      {/* Diagonal accent stripe */}
      <div style={{
        position: 'absolute',
        top: -200 * s,
        right: -80 * s,
        width: 320 * s,
        height: 900 * s,
        background: 'linear-gradient(160deg, transparent 0%, rgba(139,63,160,0.08) 40%, rgba(232,62,117,0.06) 60%, transparent 100%)',
        transform: 'rotate(15deg)',
      }} />

      {/* Diamond decorations */}
      <DiamondShape size={90 * s} x={880 * s} y={140 * s} rotate={45} />
      <DiamondShape size={50 * s} x={960 * s} y={260 * s} rotate={45} />
      <DiamondShape size={35 * s} x={850 * s} y={55 * s} rotate={45} />

      {/* Ambient glow effects */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '45%',
        height: '45%',
        background: 'radial-gradient(circle, rgba(139,63,160,0.18) 0%, transparent 65%)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '5%',
        left: '-8%',
        width: '40%',
        height: '40%',
        background: 'radial-gradient(circle, rgba(240,122,45,0.12) 0%, transparent 65%)',
      }} />

      {/* Content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,
        padding: `${50 * s}px ${55 * s}px ${50 * s}px`,
        gap: 50 * s,
      }}>
        {/* Top — event branding */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{
            fontSize: 17 * s,
            letterSpacing: '0.35em',
            color: LIGHT_GRAY,
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: 6 * s,
          }}>
            {topLine}
          </div>
          <div style={{
            fontSize: 100 * s,
            fontWeight: 700,
            lineHeight: 0.88,
            textTransform: 'uppercase',
            letterSpacing: '0.02em',
            background: GRADIENT_TEXT,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {eventName}
          </div>
        </div>

        {/* Middle — headshot + event details side by side */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 18 * s,
        }}>
          {/* Row: headshot + right-side text, centered to each other */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 45 * s,
          }}>
            <GradientCircleBorder
              src={headshot}
              size={320 * s}
              borderWidth={14 * s}
              s={s}
            />

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 * s }}>
              <div style={{
                fontSize: 30 * s,
                color: LIGHT_GRAY,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 600,
                lineHeight: 1.35,
              }}>
                {eventSubtitle}
              </div>

              <div style={{
                width: 70 * s,
                height: 3 * s,
                background: 'linear-gradient(to right, #F07A2D, #E83E75)',
              }} />

              <div style={{
                fontSize: 34 * s,
                color: WHITE,
                fontWeight: 400,
              }}>
                {eventDetails}
              </div>
            </div>
          </div>

          {/* Speaker name + title below, centered under headshot */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4 * s,
            maxWidth: (320 + 14 * 2) * s,
          }}>
            <div style={{
              fontSize: 40 * s,
              fontWeight: 700,
              color: WHITE,
              lineHeight: 1.1,
              textAlign: 'center',
            }}>
              {name}
            </div>
            <div style={{
              fontSize: 30 * s,
              color: LIGHT_GRAY,
              lineHeight: 1.4,
              whiteSpace: 'pre-line',
              fontWeight: 400,
              textAlign: 'center',
            }}>
              {title}
            </div>
          </div>
        </div>
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
  const eventSubtitle = settings.eventSubtitle || '';
  const eventDetails = settings.eventDetails || '';
  const topLine = settings.topLine || '';

  return (
    <div style={{
      width, height,
      backgroundColor: DARK_BG,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: FONT,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top gradient accent bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 4 * sy,
        background: 'linear-gradient(to right, #F07A2D, #E83E75, #8B3FA0)',
      }} />

      {/* Bottom gradient bar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 18 * sy,
        background: 'linear-gradient(to right, #F07A2D, #E83E75, #8B3FA0)',
      }} />

      {/* Diagonal stripe */}
      <div style={{
        position: 'absolute',
        top: -100 * sy,
        right: -40 * sx,
        width: 200 * sx,
        height: 600 * sy,
        background: 'linear-gradient(160deg, transparent 0%, rgba(139,63,160,0.08) 40%, rgba(232,62,117,0.06) 60%, transparent 100%)',
        transform: 'rotate(15deg)',
      }} />

      {/* Diamond decorations */}
      <DiamondShape size={55 * sy} x={1050 * sx} y={80 * sy} rotate={45} />
      <DiamondShape size={30 * sy} x={1100 * sx} y={170 * sy} rotate={45} />

      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        right: '-5%',
        width: '35%',
        height: '55%',
        background: 'radial-gradient(circle, rgba(139,63,160,0.18) 0%, transparent 65%)',
      }} />

      {/* Content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
        padding: `${28 * sy}px ${45 * sx}px ${32 * sy}px`,
      }}>
        {/* Top — event name */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{
            fontSize: 11 * sx,
            letterSpacing: '0.35em',
            color: LIGHT_GRAY,
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: 2 * sy,
          }}>
            {topLine}
          </div>
          <div style={{
            fontSize: 60 * sx,
            fontWeight: 700,
            lineHeight: 0.88,
            textTransform: 'uppercase',
            letterSpacing: '0.02em',
            background: GRADIENT_TEXT,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {eventName}
          </div>
        </div>

        {/* Bottom — headshot + speaker info + event details */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 28 * sx,
        }}>
          <GradientCircleBorder
            src={headshot}
            size={190 * sy}
            borderWidth={10 * sy}
            s={sy}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 * sy }}>
            <div style={{
              fontSize: 30 * sy,
              fontWeight: 700,
              color: WHITE,
              lineHeight: 1.1,
            }}>
              {name}
            </div>
            <div style={{
              fontSize: 14 * sy,
              color: LIGHT_GRAY,
              lineHeight: 1.35,
              whiteSpace: 'pre-line',
              fontWeight: 400,
            }}>
              {title}
            </div>
          </div>

          <div style={{
            marginLeft: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 6 * sy,
          }}>
            <div style={{
              fontSize: 11 * sx,
              color: LIGHT_GRAY,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 600,
              textAlign: 'right',
              lineHeight: 1.35,
            }}>
              {eventSubtitle}
            </div>
            <div style={{
              width: 45 * sx,
              height: 2 * sy,
              background: 'linear-gradient(to right, #F07A2D, #E83E75)',
            }} />
            <div style={{
              fontSize: 15 * sx,
              color: WHITE,
              fontWeight: 400,
              textAlign: 'right',
            }}>
              {eventDetails}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BrillianceCanvas(props: TemplateRenderProps) {
  const isSquare = props.size.width === props.size.height;
  return isSquare ? <SquareLayout {...props} /> : <LandscapeLayout {...props} />;
}

export const brilliance2025Template: TemplateConfig = {
  id: 'brilliance-2025',
  name: 'Brilliance 2025',
  description: 'Speaker card for Culture of Brilliance — dark background with gradient accents',
  category: 'Conference',
  fields: [
    { id: 'headshot', label: 'Headshot', type: 'image', perEntry: true, required: true },
    { id: 'name', label: 'Name', type: 'text', placeholder: 'Dr. Jane Smith', perEntry: true, required: true },
    { id: 'title', label: 'Title / Role', type: 'textarea', placeholder: 'Vice President of Emergency Medicine\nat Vituity', perEntry: true },
    { id: 'eventName', label: 'Event Name', type: 'text', perEntry: false, defaultValue: 'BRILLIANCE 2025' },
    { id: 'eventSubtitle', label: 'Event Subtitle', type: 'text', perEntry: false, defaultValue: 'Celebrating Women Disrupting Healthcare' },
    { id: 'eventDetails', label: 'Event Details', type: 'text', perEntry: false, defaultValue: 'November 13th · Chicago, IL' },
    { id: 'topLine', label: 'Top Line Text', type: 'text', perEntry: false, defaultValue: 'I WILL BE SPEAKING AT' },
  ],
  sizes: [
    { id: 'square', label: 'Square (1080×1080)', width: 1080, height: 1080 },
    { id: 'landscape', label: 'Landscape (1200×630)', width: 1200, height: 630 },
  ],
  defaultSettings: {
    eventName: 'BRILLIANCE 2025',
    eventSubtitle: 'Celebrating Women Disrupting Healthcare',
    eventDetails: 'November 13th · Chicago, IL',
    topLine: 'I WILL BE SPEAKING AT',
  },
  component: BrillianceCanvas,
};
