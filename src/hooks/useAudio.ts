import { useEffect, useState } from "react";
import usePermissions from "./usePermissions";

const useAudio = () => {
  const permissions = usePermissions();
  const [bubbleAudio, setBubbleAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (permissions.allowMoveAudio) {
      (async () => {
        const buttleAudioFile = await import("../assets/audio/bubble.mp3");
        const bubbleAudio = new Audio(buttleAudioFile.default);
        setBubbleAudio(bubbleAudio);
      })();
    }
  }, [permissions]);

  const playMoveAudio = () => {
    bubbleAudio?.play();
  };

  return {
    playMoveAudio,
  };
};

export default useAudio;
