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
  const { clickedImages, handleImageClick } = useGame();
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);
  const [congratsModalOpen, setCongratModalOpen] = useState(false);
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
      
      // Si después de agregar esta imagen tenemos exactamente 10, mostrar CongratsModal
      if (clickedImages.size + 1 === 10) {
        setCongratModalOpen(true);
      } else {
        setSelectedMovie(polylineName);
        setModalOpen(true);
      }
    }
  };

  const closeModal = (resetMovie?: boolean) => {
    setModalOpen(false);
    if (resetMovie) {
      setSelectedMovie(null);
    }
  };

  const closeCongratModal = () => {
    setCongratModalOpen(false);
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
                Desbloquea las looks inspirados en su estilo icónico y conoce más sobre los títulos destacados.
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
            <stop offset="0%" style={{stopColor: '#fef3c7', stopOpacity: 1}} />
            <stop offset="50%" style={{stopColor: '#d97706', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: '#fef3c7', stopOpacity: 1}} />
          </linearGradient>
        </defs>
        

        
        {!clickedImages.has('bigdaddy') ? (
          <polyline 
            name='bigdaddy' 
            points="1136,540,1139,529,1147,520,1156,529,1156,544,1164,551,1168,559,1168,571,1164,584,1163,598,1166,610,1170,620,1171,637,1175,647,1164,652,1159,637,1153,625,1147,613,1141,625,1129,630,1129,615,1127,601,1127,589,1124,576,1125,564,1129,554" 
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
            points="1669,832,1637,839,1605,842,1585,846,1568,849,1554,851,1554,869,1561,878,1566,890,1568,903,1573,915,1576,927,1583,940,1588,954,1593,966,1598,974,1610,979,1661,966,1685,961,1715,951,1725,937,1730,925,1720,907,1705,885,1690,864,1676,844" 
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
            points="1637,828,1595,839,1575,839,1575,781,1569,684,1575,664,1597,657,1632,654,1669,647,1681,645,1693,632,1725,633,1729,644,1751,644,1785,642,1800,652,1780,657,1766,669,1751,684,1749,693,1773,693,1764,708,1756,727,1752,749,1756,767,1758,789,1756,801,1710,822,1688,828" 
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
            points="1000,730,1009,725,1016,720,1027,716,1010,711,1000,715,990,721,982,728,987,738" 
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
            points="941,299,931,306,931,315,921,328,915,338,915,354,926,369,944,372,954,372,968,372,971,354,963,338,956,326,954,311" 
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
            points="1273,479,1261,484,1258,467,1263,454,1277,447,1295,450,1306,457,1304,479,1290,484,1290,474,1289,462,1273,464" 
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
            points="357,776,330,769,251,767,223,598,244,525,256,525,254,450,234,460,215,465,229,435,213,387,225,389,227,372,242,382,259,386,273,401,300,392,313,392,301,409,301,516,329,518,351,523,374,593" 
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
            points="128,816,128,806,113,796,103,784,88,781,69,777,56,784,45,796,32,808,35,823,45,896,93,899,112,896,125,889,125,825" 
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
            points="551,720,554,704,564,696,569,682,564,667,556,654,563,635,554,623,554,604,553,574,546,554,530,538,508,530,486,526,469,530,449,537,434,545,427,560,429,579,424,598,422,615,422,632,420,642,424,660,422,677,417,691,417,704,425,711,447,715,461,716,474,723,486,720,493,698,490,679,488,660,485,647,478,626,468,608,463,591,468,572,481,562,491,557,510,548,529,567,530,596,525,623,522,643,519,660,515,672,515,691,515,708,529,713" 
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
            points="466,281,476,274,476,259,458,253,434,253,422,259,396,260,395,272,413,269,427,276,439,279" 
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
            points="1078,899,1041,903,1009,896,987,893,970,884,960,881,968,871,975,854,983,838,992,827,993,803,995,781,997,765,1012,769,1019,755,1038,755,1051,772,1092,774,1136,774,1144,789,1138,821,1146,845,1158,867,1160,876,1124,876,1104,886" 
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
            points="1133,696,1136,706,1119,710,1111,723,1109,735,1131,730,1150,730,1167,733,1180,735,1200,732,1209,718,1226,710,1212,696,1195,696,1189,682,1165,686,1144,689" 
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
            points="1814,411,1811,530,1894,532,1889,413" 
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
            points="1479,818,1492,815,1499,808,1501,796,1499,777,1494,760,1496,745,1492,725,1479,720,1475,693,1480,650,1489,640,1497,611,1482,608,1473,618,1468,649,1460,693,1455,720,1440,737,1440,757,1428,777,1423,801,1433,811,1451,816" 
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
            points="1506,782,1563,794,1560,662,1601,645,1645,638,1669,633,1689,618,1709,618,1711,499,1709,398,1650,331,1594,345,1484,355,1484,406,1507,438,1460,548,1426,571,1426,587,1460,598,1480,598,1506,606,1513,635,1501,652,1489,682,1489,708,1516,733" 
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
            points="1560,343,1570,343,1579,333,1589,323,1585,299,1565,262,1553,287,1546,301,1536,316,1536,328,1545,335" 
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
            points="1736,360,1719,364,1718,345,1723,320,1736,313,1750,321,1772,320,1789,309,1811,313,1828,313,1857,309,1881,306,1889,325,1894,338,1879,345,1848,348,1831,354,1814,343,1804,348,1791,359,1769,357" 
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
            points="1450,613,1434,615,1416,615,1418,603,1409,594,1397,596,1384,586,1368,589,1358,594,1345,591,1348,603,1358,615,1360,628,1356,647,1363,659,1372,671,1379,686,1384,698,1395,704,1404,706,1412,716,1409,730,1406,749,1418,754,1426,743,1429,720,1440,708,1450,699,1450,654" 
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
            points="1373,832,1345,830,1309,827,1287,815,1273,791,1265,760,1273,738,1294,723,1317,715,1340,718,1365,730,1379,743,1384,757,1380,772,1389,779,1397,793,1392,806,1389,821" 
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
        onClose={closeCongratModal}
      />
      </div>
    </RouteProtection>
  )
}
