import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Maximize2,
  Volume2,
  VolumeX,
  Compass,
  MapPin,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { useBrandMedia } from '../context/BrandMediaContext';
import {
  loadDroneVideo,
  DRONE_VIDEO_EVENT,
  DEFAULT_DRONE_VIDEO,
  DroneVideoMeta,
} from '../utils/droneVideoStorage';

export const EagleViewSection: React.FC = () => {
  const { getImage, customSlots } = useBrandMedia();
  const [videoSrc, setVideoSrc] = useState<string>(DEFAULT_DRONE_VIDEO);
  const [isCustomVideo, setIsCustomVideo] = useState<boolean>(false);
  const [videoMeta, setVideoMeta] = useState<DroneVideoMeta | null>(null);
  const [hasPlaybackError, setHasPlaybackError] = useState<boolean>(false);

  const hasCustomAerialPhoto = !!customSlots.eagleViewFarm;

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  const safePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      const promise = video.play();
      if (promise !== undefined) {
        playPromiseRef.current = promise;
        promise
          .then(() => {
            playPromiseRef.current = null;
            setIsPlaying(true);
            setHasPlaybackError(false);
          })
          .catch((error: unknown) => {
            playPromiseRef.current = null;
            if (error instanceof Error && error.name === 'AbortError') {
              return;
            }
            setIsPlaying(false);
          });
      }
    } catch {
      setIsPlaying(false);
    }
  };

  const safePause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (playPromiseRef.current) {
      playPromiseRef.current
        .then(() => {
          video.pause();
          setIsPlaying(false);
        })
        .catch(() => {
          video.pause();
          setIsPlaying(false);
        });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // Load custom video if available in IndexedDB
  const syncStoredVideo = () => {
    loadDroneVideo().then(({ url, isCustom, meta }) => {
      setVideoSrc(url);
      setIsCustomVideo(isCustom);
      setVideoMeta(meta);
      setHasPlaybackError(false);
    });
  };

  useEffect(() => {
    syncStoredVideo();

    // Listen for custom video update events
    const handleVideoEvent = () => {
      syncStoredVideo();
    };

    window.addEventListener(DRONE_VIDEO_EVENT, handleVideoEvent);
    return () => {
      window.removeEventListener(DRONE_VIDEO_EVENT, handleVideoEvent);
    };
  }, []);

  // Safe autoplay on video source change
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onCanPlay = () => {
      safePlay();
    };

    video.addEventListener('canplay', onCanPlay, { once: true });
    if (video.readyState >= 3) {
      safePlay();
    }

    return () => {
      video.removeEventListener('canplay', onCanPlay);
      safePause();
    };
  }, [videoSrc]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      safePlay();
    } else {
      safePause();
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 0;
    setCurrentTime(curr);
    setDuration(dur);
    if (dur > 0) {
      setProgress((curr / dur) * 100);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(1, clickX / rect.width));
    videoRef.current.currentTime = newProgress * duration;
    setProgress(newProgress * 100);
  };

  const formatTime = (timeInSec: number) => {
    const mins = Math.floor(timeInSec / 60);
    const secs = Math.floor(timeInSec % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <section
      id="eagle-view-drone-tour"
      className="py-20 sm:py-28 bg-[#0D261B] text-white relative overflow-hidden border-t border-b border-[#1E4D38]"
    >
      {/* Background Accent Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#C89D4B_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E4D38] border border-[#2D6A4F] text-[#C89D4B] text-xs font-bold uppercase tracking-widest mb-4 shadow-xs">
            <Compass className="w-3.5 h-3.5" />
            <span>Aerial Drone Reconnaissance</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Eagle View of Genius Dairy Farm
          </h2>

          <p className="text-sm sm:text-base text-[#9BB0A3] mt-3 leading-relaxed">
            Panoramic aerial surveillance showcasing the scale, pastures, covered cattle shelters, and
            sustainable infrastructure across our 60-acre facility in{' '}
            <strong className="text-white font-semibold">Iseyin, Oyo State, Nigeria</strong>.
          </p>
        </div>

        {/* Cinematic Video Showcase Container */}
        <div
          ref={containerRef}
          id="eagle-view-video-player-box"
          className="relative rounded-2xl overflow-hidden border border-[#2D6A4F]/60 bg-[#07130D] shadow-2xl group transition-all ring-1 ring-[#C89D4B]/20"
        >
          {/* Main Video Element */}
          <video
            ref={videoRef}
            src={videoSrc}
            poster={getImage('eagleViewFarm')}
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleTimeUpdate}
            onPlay={() => {
              setIsPlaying(true);
              setHasPlaybackError(false);
            }}
            onPause={() => setIsPlaying(false)}
            onError={() => setHasPlaybackError(true)}
            className="w-full aspect-video sm:aspect-16/9 object-cover cursor-pointer block"
            onClick={togglePlay}
          />

          {/* Fallback Error Display if Video Fails */}
          {hasPlaybackError && (
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-30">
              <AlertCircle className="w-12 h-12 text-[#C89D4B] mb-3" />
              <h4 className="font-heading font-bold text-lg text-white mb-1">
                Video Playback Notice
              </h4>
              <p className="text-xs text-[#9BB0A3] max-w-md leading-relaxed">
                The farm tour video is loading or experiencing a network pause. Please refresh or check connection.
              </p>
            </div>
          )}

          {/* Top Telemetry Overlay */}
          <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-b from-black/80 via-black/30 to-transparent flex items-center justify-between pointer-events-none text-xs font-mono z-20">
            <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-[#9BB0A3] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-white font-semibold">
                {isCustomVideo ? 'CUSTOM AERIAL' : 'DRONE 4K AERIAL'}
              </span>
              <span className="hidden sm:inline">| ALT: 85m AGL</span>
            </div>

            <div className="flex items-center gap-2 pointer-events-auto">
              {isCustomVideo && (
                <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950/85 backdrop-blur-md text-emerald-300 border border-emerald-500/40 rounded-full text-[11px] font-semibold">
                  <Sparkles className="w-3 h-3 text-[#C89D4B]" />
                  <span>Custom Video</span>
                </span>
              )}

              {hasCustomAerialPhoto && (
                <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 bg-amber-950/85 backdrop-blur-md text-amber-300 border border-amber-500/40 rounded-full text-[11px] font-semibold">
                  <Sparkles className="w-3 h-3 text-[#C89D4B]" />
                  <span>Custom Photo</span>
                </span>
              )}

              <div className="hidden lg:flex items-center gap-2 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-[#C89D4B]">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-white text-[11px] sm:text-xs">
                  7.9658° N, 3.5985° E • ISEYIN
                </span>
              </div>
            </div>
          </div>

          {/* Center Big Play/Pause Toggle Indicator on Hover or Pause */}
          {!isPlaying && !hasPlaybackError && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs transition-opacity cursor-pointer"
              onClick={togglePlay}
            >
              <div className="w-20 h-20 rounded-full bg-[#C89D4B] text-[#0D261B] flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform">
                <Play className="w-8 h-8 ml-1 fill-[#0D261B]" />
              </div>
            </div>
          )}

          {/* Bottom Sleek Control Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity">
            {/* Progress Scrubber Bar */}
            <div
              className="w-full h-1.5 bg-white/20 hover:h-2.5 rounded-full cursor-pointer transition-all mb-4 relative"
              onClick={handleSeek}
              title="Seek playback"
            >
              <div
                className="h-full bg-[#C89D4B] rounded-full relative"
                style={{ width: `${progress}%` }}
              >
                <div className="w-3 h-3 rounded-full bg-white absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 shadow-xs" />
              </div>
            </div>

            {/* Playback Controls & Caption */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="p-2 text-white hover:text-[#C89D4B] transition-colors cursor-pointer"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
                </button>

                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-2 text-white hover:text-[#C89D4B] transition-colors cursor-pointer"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>

                <div className="text-xs font-mono text-[#CFDDD4] hidden sm:block">
                  {formatTime(currentTime)} / {formatTime(duration || 0)}
                </div>
              </div>

              {/* Center Title Label */}
              <div className="text-center truncate px-2 hidden md:block">
                <span className="text-xs font-semibold text-[#CFDDD4] tracking-wide">
                  {isCustomVideo && videoMeta
                    ? `Eagle View: ${videoMeta.name}`
                    : 'Eagle View Of Genius Dairy Farm, Iseyin, Oyo State, Nigeria'}
                </span>
              </div>

              {/* Right Fullscreen Toggle */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="p-2 text-white hover:text-[#C89D4B] transition-colors cursor-pointer"
                  title="Fullscreen"
                  aria-label="Toggle Fullscreen"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Information Bar */}
        <div className="mt-6 bg-[#143727] border border-[#2D6A4F] rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-5 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#1E4D38] border border-[#2D6A4F] flex items-center justify-center text-[#C89D4B] shrink-0 shadow-xs">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-extrabold text-base sm:text-lg text-white">
                  Eagle View Aerial Survey — 60-Acre Dairy Facility
                </h3>
              </div>
              <p className="text-xs text-[#9BB0A3] mt-1 leading-relaxed">
                Pasture paddocks, covered cattle housing, deep boreholes, and mechanical feed processing in Iseyin, Oyo State.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <span className="text-xs font-semibold text-[#C89D4B] bg-[#0D261B] px-4 py-2 rounded-full border border-[#2D6A4F]">
              Iseyin, Oyo State
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
