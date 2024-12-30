import React, { useEffect } from "react";

export const SldpPlayer = ({ userQueue }) => {
    let sldpPlayer;

    useEffect(() => {
        let initialized = false;
        const isSmallScreen = window.innerWidth < 412;

        const loadSLDP = () => {
            const existingScript = document.querySelector(
                'script[src="https://softvelum.com/player/releases/sldp-v3.0.1.min.js"]'
            );

            if (existingScript) {
                console.log("SLDP script already loaded.");
                initPlayer();
                return;
            }

            if (initialized) return;
            initialized = true;

            const script = document.createElement("script");
            script.src = "https://softvelum.com/player/releases/sldp-v3.0.1.min.js";
            script.async = true;
            script.onload = initPlayer;
            document.body.appendChild(script);
        };

        const initPlayer = () => {
            const playerElement = document.getElementById("player");

            if (playerElement?.hasChildNodes()) {
                console.warn("Player already initialized.");
                return;
            }

            if (window.SLDP) {
                console.log("Initializing SLDP Player...");
                sldpPlayer = window.SLDP.init({
                    container: "player",
                    stream_url: "wss://5ostudioslive.cachefly.net/5ostudios/live",
                    adaptive_bitrate: {
                        initial_rendition: "240p",
                    },
                    buffering: 500,
                    autoplay: true,
                    height: isSmallScreen ? 500 : 500,
                    width: isSmallScreen ? 340 : 385,
                    controls: false,
                });

                console.log("SLDP Player Object:", sldpPlayer); // Log the player object

                // Use `.on()` if it exists, otherwise fall back to `addEventListener`
                if (sldpPlayer && typeof sldpPlayer.on === "function") {
                    sldpPlayer.on("playback", () => {
                        console.log("Playback started.");
                    });
                    sldpPlayer.on("ready", () => {
                        console.log("Player is ready.");
                    });
                    sldpPlayer.on("error", (error) => {
                        console.error("SLDP Player Error:", error);
                    });
                } else if (sldpPlayer) {
                    console.log("Using addEventListener instead of .on() for events.");
                    sldpPlayer.addEventListener("playback", () => {
                        console.log("Playback started.");
                    });
                    sldpPlayer.addEventListener("ready", () => {
                        console.log("Player is ready.");
                    });
                    sldpPlayer.addEventListener("error", (error) => {
                        console.error("SLDP Player Error:", error);
                    });
                } else {
                    console.error("SLDP Player failed to initialize.");
                }
            } else {
                console.error("SLDP Player failed to load.");
            }
        };

        loadSLDP();

        // Cleanup function to destroy the player when the component unmounts
        return () => {
            if (sldpPlayer) {
                sldpPlayer.destroy(() => console.log("SLDP Player destroyed."));
            }
        };
    }, []);

    return (
        <div className="flex flex-col gap-2 items-center justify-center">
            <div className="flex relative border-[5px] border-blue-400 w-[21rem] h-[29.5rem] lg:w-[32.5rem] lg:h-[32rem] rounded-[20px] max-w-[22rem] max-h-[40.5rem] overflow-hidden shadow-[10px_10px_10px_rgba(0,0,0,0.3)]">
                <div
                    id="player"
                    style={{ width: "100%", height: "100%", zIndex: 0 }}
                ></div>
            </div>
        </div>
    );
};
