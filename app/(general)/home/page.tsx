'use client';
import React, { useState, useRef, useEffect } from 'react'
import { useGame } from '../../context/GameContext';
import { Overlay, LandscapePrompt, CongratsModal, RouteProtection } from '@/components';
import { ControlButtons } from '@/components/controls/Controls';
import { AudioPlayer, AudioPlayerRef } from '@/components/audio-player/AudioPlayer';
import { Button } from '@/components/button/Button';
import { MovieModal } from '@/components/movie-modal/MovieModal';

export default function HomePage() {
  const [isPressed, setIsPressed] = useState(false);
  // const audioRef = useRef<HTMLAudioElement>(null); // Unused for now
  const [overlayEnabled, setOverlayEnabled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const audioPlayerRef = useRef<AudioPlayerRef>(null);
  const { clickedImages, handleImageClick, congratsModalOpen, closeCongratsModal, openCongratsModal } = useGame();

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);
  const [pendingCongrats, setPendingCongrats] = useState(false);
  const totalImages = 19; // Número total de películas ocultas

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('isShowModal');
    if (!hasVisitedBefore) {
      setShowWelcomeModal(true);
    }
  }, []);

  const handleWelcomeContinue = () => {
    localStorage.setItem('isShowModal', 'true');
    setShowWelcomeModal(false);
  };

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleMouseLeave = () => {
    setIsPressed(false);
  };

  const resetCounter = () => {
    localStorage.removeItem('clickedImages');
    handleImageClick('RESET_ALL');
  };

  const toggleOverlay = () => {
    setOverlayEnabled(!overlayEnabled);
    if (!overlayEnabled) {
      setIsPressed(true);
    } else {
      setIsPressed(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const playSound = () => {
    audioPlayerRef.current?.playSound();
  };

  const handlePolylineClick = (polylineName: string) => {
    if (!clickedImages.has(polylineName)) {
      handleImageClick(polylineName);
      playSound();

      // Abrir primero el MovieModal; si con este clic se llega a 10, marcar para abrir Congrats al cerrar
      const newSize = clickedImages.size + 1;
      if (newSize === 10 || newSize === 19) {
        setPendingCongrats(true);
      }
      setSelectedMovie(polylineName);
      setModalOpen(true);
    }
  };

  const closeModal = (resetMovie?: boolean) => {
    setModalOpen(false);
    if (resetMovie) {
      setSelectedMovie(null);
    }
    if (pendingCongrats) {
      setPendingCongrats(false);
      openCongratsModal();
    }
  };


  return (
    <RouteProtection requireFormCompletion={true}>
      <div className="relative w-full h-screen overflow-hidden page-home">
        <LandscapePrompt />

        {showWelcomeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">

            <div className="absolute inset-0" />

            <div className="relative bg-gradient-to-b from-[#010B14] via-[#0F334B] to-blue-950 rounded-2xl p-8 mx-4 h-[400px] shadow-2xl">
              <div className="text-center text-white flex flex-col items-center justify-center h-full">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-yellow-300 w-6/12 mx-auto">
                  Bienvenido al Closet<br />de Adam Sandler
                </h2>
                <p className="text-base md:text-lg mb-4 leading-relaxed w-8/12 mx-auto">
                  Descubre mínimo 10 objetos ocultos de sus películas más famosas usando el puntero.
                </p>
                <p className="text-base md:text-lg mb-8 leading-relaxed w-8/12 mx-auto">
                  Desbloquea looks inspirados en su estilo icónico y conoce sobre sus tíulos más destacados.
                </p>
                <Button
                  textButton="Continuar"
                  callToAction={handleWelcomeContinue}
                  classes="mx-auto mt-5"
                />
              </div>
            </div>
          </div>
        )}

        <Overlay overlayEnabled={overlayEnabled} isPressed={isPressed} />
        <svg
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 w-full h-full pointer-events-none"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <defs>
            <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#fef3c7', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#fef3c7', stopOpacity: 1 }} />
            </linearGradient>
          </defs>



          {!clickedImages.has('bigdaddy') ? (
            <polyline
              name='bigdaddy'
              points="1170,661,1180,661,1178,649,1173,634,1172,619,1168,604,1170,588,1177,578,1173,563,1165,551,1161,541,1151,531,1144,543,1144,554,1138,568,1133,585,1131,598,1138,614,1134,629,1134,639,1146,639,1150,626,1156,634,1161,646"
              fill="none"
              stroke="transparent"
              strokeWidth="3"
              className="polyline-hover"
              onMouseEnter={playSound}
              onClick={() => handlePolylineClick('bigdaddy')}
            />
          ) : (
            <circle
              cx="1150"
              cy="588"
              r="12"
              fill="#fef3c7"
              filter="blur(1px)"
              opacity={overlayEnabled ? "0.8" : "0"}
              className="transition-opacity duration-300"
            />
          )}
          {!clickedImages.has('spanglish') ? (
            <polyline
              name='spanglish'
              points="1684,848,1674,844,1657,848,1611,853,1577,858,1563,860,1558,871,1563,890,1570,909,1577,927,1585,955,1592,973,1607,975,1624,980,1679,973,1716,963,1725,949,1735,932,1728,916,1702,878,1694,865"
              fill="none"
              stroke="transparent"
              strokeWidth="3"
              className="polyline-hover"
              onMouseEnter={playSound}
              onClick={() => handlePolylineClick('spanglish')}
            />
          ) : (
            <circle
              cx="1642"
              cy="912"
              r="12"
              fill="#fef3c7"
              filter="blur(1px)"
              opacity={overlayEnabled ? "0.8" : "0"}
              className="transition-opacity duration-300"
            />
          )}
          {!clickedImages.has('mrdeeds') ? (
            <polyline
              name='mrdeeds'
              points="1803,653,1731,658,1731,643,1706,641,1691,644,1686,653,1663,661,1626,663,1607,666,1585,671,1575,683,1577,699,1577,724,1577,741,1579,765,1577,788,1577,819,1577,839,1591,848,1609,848,1628,843,1643,841,1663,839,1682,841,1699,841,1716,829,1733,822,1755,817,1765,799,1767,782,1757,766,1753,746,1764,731,1772,714,1753,705,1780,665"
              fill="none"
              stroke="transparent"
              strokeWidth="3"
              className="polyline-hover"
              onMouseEnter={playSound}
              onClick={() => handlePolylineClick('mrdeeds')}
            />
          ) : (
            <circle
              cx="1685"
              cy="741"
              r="12"
              fill="#fef3c7"
              filter="blur(1px)"
              opacity={overlayEnabled ? "0.8" : "0"}
              className="transition-opacity duration-300"
            />
          )}
          {!clickedImages.has('clic') ? (
            <polyline
              name='clic'
              points="1009,738,1000,746,987,746,992,732,1005,726,1021,722,1034,722,1031,732"
              fill="none"
              stroke="transparent"
              strokeWidth="3"
              className="polyline-hover"
              onMouseEnter={playSound}
              onClick={() => handlePolylineClick('clic')}
            />
          ) : (
            <circle
              cx="1005"
              cy="725"
              r="12"
              fill="#fef3c7"
              filter="blur(1px)"
              opacity={overlayEnabled ? "0.8" : "0"}
              className="transition-opacity duration-300"
            />
          )}
          {!clickedImages.has('zookeeper') ? (
            <polyline
              name='zookeeper'
              points="946,381,927,383,919,371,915,356,921,342,931,329,938,315,948,310,958,319,961,331,965,342,973,359,978,371,975,383,960,381"
              fill="none"
              stroke="transparent"
              strokeWidth="3"
              className="polyline-hover"
              onMouseEnter={playSound}
              onClick={() => handlePolylineClick('zookeeper')}
            />
          ) : (
            <circle
              cx="943"
              cy="335"
              r="12"
              fill="#fef3c7"
              filter="blur(1px)"
              opacity={overlayEnabled ? "0.8" : "0"}
              className="transition-opacity duration-300"
            />
          )}
          {!clickedImages.has('shakestheclown') ? (
            <polyline
              name='shakestheclown'
              points="1292,492,1302,493,1312,490,1316,473,1306,456,1285,454,1268,459,1265,471,1261,485,1267,493,1277,485,1282,471,1295,470,1299,478"
              fill="none"
              stroke="transparent"
              strokeWidth="3"
              className="polyline-hover"
              onMouseEnter={playSound}
              onClick={() => handlePolylineClick('shakestheclown')}
            />
          ) : (
            <circle
              cx="1282"
              cy="465"
              r="12"
              fill="#fef3c7"
              filter="blur(1px)"
              opacity={overlayEnabled ? "0.8" : "0"}
              className="transition-opacity duration-300"
            />
          )}
          {!clickedImages.has('hoteltransylvania') ? (
            <polyline
              name='hoteltransylvania'
              points="293,777,308,777,322,777,339,777,354,785,363,765,366,680,376,607,354,534,327,529,307,526,301,426,310,410,322,400,295,402,278,412,261,397,246,388,232,388,232,397,220,397,222,410,232,432,234,448,215,480,234,473,254,461,256,485,259,529,247,534,230,610,257,777"
              fill="none"
              stroke="transparent"
              strokeWidth="3"
              className="polyline-hover"
              onMouseEnter={playSound}
              onClick={() => handlePolylineClick('hoteltransylvania')}
            />
          ) : (
            <circle
              cx="288"
              cy="582"
              r="12"
              fill="#fef3c7"
              filter="blur(1px)"
              opacity={overlayEnabled ? "0.8" : "0"}
              className="transition-opacity duration-300"
            />
          )}
          {!clickedImages.has('grownups') ? (
            <polyline
              name='grownups'
              points="137,819,134,832,132,849,130,871,127,888,125,899,100,907,67,907,54,888,44,866,40,839,35,822,49,809,62,793,78,788,95,790,108,790,120,799,128,809"
              fill="none"
              stroke="transparent"
              strokeWidth="3"
              className="polyline-hover"
              onMouseEnter={playSound}
              onClick={() => handlePolylineClick('grownups')}
            />
          ) : (
            <circle
              cx="80"
              cy="838"
              r="12"
              fill="#fef3c7"
              filter="blur(1px)"
              opacity={overlayEnabled ? "0.8" : "0"}
              className="transition-opacity duration-300"
            />
          )}
          {!clickedImages.has('jackandjill') ? (
            <polyline
              name='jackandjill'
              points="497,727,483,731,469,732,452,727,435,729,420,717,420,699,429,676,434,658,424,646,425,622,429,602,430,583,432,561,449,546,473,534,497,536,524,537,539,546,547,568,554,590,559,615,558,631,564,639,559,663,564,676,571,690,558,712,561,729,539,724,520,721,522,702,517,684,510,660,524,646,530,631,532,609,534,594,532,573,519,555,510,565,491,572,471,588,469,604,478,627,485,648,491,682,497,709"
              fill="none"
              stroke="transparent"
              strokeWidth="3"
              className="polyline-hover"
              onMouseEnter={playSound}
              onClick={() => handlePolylineClick('jackandjill')}
            />
          ) : (
            <circle
              cx="495"
              cy="625"
              r="12"
              fill="#fef3c7"
              filter="blur(1px)"
              opacity={overlayEnabled ? "0.8" : "0"}
              className="transition-opacity duration-300"
            />
          )}
          {!clickedImages.has('thatsmyboy') ? (
            <polyline
              name='thatsmyboy'
              points="463,280,466,290,478,290,483,276,469,264,444,263,430,268,403,271,400,281,419,276,432,283,442,287,452,287"
              fill="none"
              stroke="transparent"
              strokeWidth="3"
              className="polyline-hover"
              onMouseEnter={playSound}
              onClick={() => handlePolylineClick('thatsmyboy')}
            />
          ) : (
            <circle
              cx="436"
              cy="266"
              r="12"
              fill="#fef3c7"
              filter="blur(1px)"
              opacity={overlayEnabled ? "0.8" : "0"}
              className="transition-opacity duration-300"
            />
          )}
          {!clickedImages.has('reignoverme') ? (
            <polyline
              name='reignoverme'
              points="1019,780,1002,780,999,795,999,817,992,843,983,856,977,868,977,885,970,894,988,900,1012,904,1044,910,1073,912,1085,910,1105,897,1126,892,1156,887,1173,880,1158,863,1151,846,1148,822,1144,805,1143,782,1104,782,1058,783"
              fill="none"
              stroke="transparent"
              strokeWidth="3"
              className="polyline-hover"
              onMouseEnter={playSound}
              onClick={() => handlePolylineClick('reignoverme')}
            />
          ) : (
            <circle
              cx="1060"
              cy="827"
              r="12"
              fill="#fef3c7"
              filter="blur(1px)"
              opacity={overlayEnabled ? "0.8" : "0"}
              className="transition-opacity duration-300"
            />
          )}
          {!clickedImages.has('youdontmesswiththezohan') ? (
            <polyline
              name='youdontmesswiththezohan'
              points="1124,715,1114,743,1138,741,1161,739,1182,743,1204,741,1211,729,1231,717,1211,702,1199,709,1199,695,1183,690,1160,695,1138,702,1143,714"
              fill="none"
              stroke="transparent"
              strokeWidth="3"
              className="polyline-hover"
              onMouseEnter={playSound}
              onClick={() => handlePolylineClick('youdontmesswiththezohan')}
            />
          ) : (
            <circle
              cx="1168"
              cy="709"
              r="12"
              fill="#fef3c7"
              filter="blur(1px)"
              opacity={overlayEnabled ? "0.8" : "0"}
              className="transition-opacity duration-300"
            />
          )}
          {!clickedImages.has('punchdrunkloveme') ? (
            <polyline
              name='punchdrunkloveme'
              points="1814,422,1818,541,1896,539,1896,420"
              fill="none"
              stroke="transparent"
              strokeWidth="3"
              className="polyline-hover"
              onMouseEnter={playSound}
              onClick={() => handlePolylineClick('punchdrunkloveme')}
            />
          ) : (
            <circle
              cx="1852"
              cy="472"
              r="12"
              fill="#fef3c7"
              filter="blur(1px)"
              opacity={overlayEnabled ? "0.8" : "0"}
              className="transition-opacity duration-300"
            />
          )}
          {!clickedImages.has('50firstdates') ? (
            <polyline
              name='50firstdates'
              points="1492,615,1482,622,1479,632,1473,648,1475,660,1470,690,1463,726,1451,734,1443,746,1445,763,1441,777,1433,788,1429,805,1438,817,1455,826,1475,827,1490,826,1502,816,1506,797,1501,780,1497,766,1502,753,1494,738,1480,732,1484,690,1489,656,1497,643,1502,627"
              fill="none"
              stroke="transparent"
              strokeWidth="3"
              className="polyline-hover"
              onMouseEnter={playSound}
              onClick={() => handlePolylineClick('50firstdates')}
            />
          ) : (
            <circle
              cx="1462"
              cy="713"
              r="12"
              fill="#fef3c7"
              filter="blur(1px)"
              opacity={overlayEnabled ? "0.8" : "0"}
              className="transition-opacity duration-300"
            />
          )}
          {!clickedImages.has('pixels') ? (
            <polyline
              name='pixels'
              points="1718,629,1716,604,1718,580,1714,549,1716,521,1714,487,1714,465,1716,446,1716,419,1714,404,1660,336,1653,344,1592,351,1545,358,1501,365,1489,376,1489,395,1487,412,1489,424,1509,446,1467,556,1429,578,1429,597,1448,605,1519,614,1521,644,1504,673,1494,709,1511,743,1514,780,1536,790,1567,797,1565,770,1568,743,1567,715,1563,688,1570,666,1592,656,1643,653,1672,644"
              fill="none"
              stroke="transparent"
              strokeWidth="3"
              className="polyline-hover"
              onMouseEnter={playSound}
              onClick={() => handlePolylineClick('pixels')}
            />
          ) : (
            <circle
              cx="1568"
              cy="562"
              r="12"
              fill="#fef3c7"
              filter="blur(1px)"
              opacity={overlayEnabled ? "0.8" : "0"}
              className="transition-opacity duration-300"
            />
          )}
          {!clickedImages.has('eightcrazynights') ? (
            <polyline
              name='eightcrazynights'
              points="1557,346,1545,344,1546,329,1550,314,1557,302,1562,287,1570,273,1580,297,1585,312,1591,324,1592,336,1577,344"
              fill="none"
              stroke="transparent"
              strokeWidth="3"
              className="polyline-hover"
              onMouseEnter={playSound}
              onClick={() => handlePolylineClick('eightcrazynights')}
            />
          ) : (
            <circle
              cx="1563"
              cy="302"
              r="12"
              fill="#fef3c7"
              filter="blur(1px)"
              opacity={overlayEnabled ? "0.8" : "0"}
              className="transition-opacity duration-300"
            />
          )}
          {!clickedImages.has('angrymanager') ? (
            <polyline
              name='angrymanager'
              points="1901,359,1881,356,1860,358,1845,365,1826,361,1809,361,1791,368,1767,366,1740,370,1718,373,1725,349,1730,326,1745,322,1764,324,1777,319,1796,315,1814,312,1825,312,1850,314,1870,310,1887,309,1896,324,1899,341"
              fill="none"
              stroke="transparent"
              strokeWidth="3"
              className="polyline-hover"
              onMouseEnter={playSound}
              onClick={() => handlePolylineClick('angrymanager')}
            />
          ) : (
            <circle
              cx="1807"
              cy="337"
              r="12"
              fill="#fef3c7"
              filter="blur(1px)"
              opacity={overlayEnabled ? "0.8" : "0"}
              className="transition-opacity duration-300"
            />
          )}
          {!clickedImages.has('justgowithit') ? (
            <polyline
              name='justgowithit'
              points="1457,619,1457,705,1448,710,1438,721,1433,731,1433,743,1429,758,1423,766,1411,760,1414,739,1418,724,1409,714,1397,712,1385,697,1377,678,1370,663,1365,646,1362,629,1367,615,1355,609,1343,598,1360,595,1379,595,1395,595,1407,607,1426,604,1423,614,1414,622,1436,624"
              fill="none"
              stroke="transparent"
              strokeWidth="3"
              className="polyline-hover"
              onMouseEnter={playSound}
              onClick={() => handlePolylineClick('justgowithit')}
            />
          ) : (
            <circle
              cx="1398"
              cy="673"
              r="12"
              fill="#fef3c7"
              filter="blur(1px)"
              opacity={overlayEnabled ? "0.8" : "0"}
              className="transition-opacity duration-300"
            />
          )}
          {!clickedImages.has('thelongestyard') ? (
            <polyline
              name='thelongestyard'
              points="1358,844,1373,841,1390,838,1395,821,1401,800,1395,787,1379,783,1387,773,1384,760,1375,746,1363,738,1348,729,1328,726,1312,729,1299,732,1287,746,1277,760,1275,775,1275,792,1284,809,1290,819,1309,829,1326,834,1338,839"
              fill="none"
              stroke="transparent"
              strokeWidth="3"
              className="polyline-hover"
              onMouseEnter={playSound}
              onClick={() => handlePolylineClick('thelongestyard')}
            />
          ) : (
            <circle
              cx="1331"
              cy="773"
              r="12"
              fill="#fef3c7"
              filter="blur(1px)"
              opacity={overlayEnabled ? "0.8" : "0"}
              className="transition-opacity duration-300"
            />
          )}
        </svg>


        <AudioPlayer ref={audioPlayerRef} isMuted={isMuted} />

        <div className="controls-container">
          <ControlButtons
            isMuted={isMuted}
            overlayEnabled={overlayEnabled}
            onToggleMute={toggleMute}
            onToggleOverlay={toggleOverlay}
            onResetCounter={resetCounter}
          />
        </div>

        <MovieModal
          isOpen={modalOpen}
          selectedMovie={selectedMovie}
          clickedImages={clickedImages}
          totalImages={totalImages}
          onClose={closeModal}
        />

        <CongratsModal
          isOpen={congratsModalOpen}
          clickedImages={clickedImages}
          totalImages={totalImages}
          onClose={closeCongratsModal}
          onMovieSelect={(movieName: string) => {
            setSelectedMovie(movieName);
            setModalOpen(true);
            closeCongratsModal();
          }}
        />
      </div>
    </RouteProtection>
  )
}
