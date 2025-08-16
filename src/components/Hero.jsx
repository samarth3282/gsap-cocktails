import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
    const canvasRef = useRef();
    const frameCount = 310; // total number of frames you exported
    const images = useRef([]);
    const [loaded, setLoaded] = useState(false);

    const isMobile = useMediaQuery({ maxWidth: 767 });

    // ✅ Preload all images
    useEffect(() => {
        let loadedCount = 0;
        for (let i = 1; i < frameCount + 1; i++) {
            const img = new Image();
            img.src = `/frames/frame_${String(i).padStart(4, "0")}.jpg`;
            // e.g. frame_0001.jpg, frame_0002.jpg ... frame_0150.jpg
            img.onload = () => {
                loadedCount++;
                if (loadedCount === frameCount) setLoaded(true);
            };
            images.current[i] = img;
        }
    }, []);

    useGSAP(() => {
        if (!loaded) return;

        const heroSplit = new SplitText(".title", {
            type: "chars, words",
        });

        const paragraphSplit = new SplitText(".subtitle", {
            type: "lines",
        });

        heroSplit.chars.forEach((char) =>
            char.classList.add("text-gradient")
        );

        gsap.from(heroSplit.chars, {
            yPercent: 100,
            duration: 1.8,
            ease: "expo.out",
            stagger: 0.06,
        });

        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: "expo.out",
            stagger: 0.06,
            delay: 1,
        });

        gsap
            .timeline({
                scrollTrigger: {
                    trigger: "#hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            })
            .to(".right-leaf", { y: 200 }, 0)
            .to(".left-leaf", { y: -200 }, 0)
            .to(".arrow", { y: 100 }, 0);

        // 🎥 Image sequence scroll
        const startValue = isMobile ? "top 50%" : "center 60%";
        const endValue = isMobile ? "120% top" : "bottom top";

        let frame = { index: 0 };
        // const context = canvasRef.current.getContext("2d");

        const render = () => {
            const img = images.current[frame.index];
            if (!img) return;

            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");

            const canvasWidth = canvas.width = canvas.offsetWidth;
            const canvasHeight = canvas.height = canvas.offsetHeight;

            const imgWidth = img.width;
            const imgHeight = img.height;

            // Scale based on height
            let scale = canvasHeight / imgHeight;

            let newWidth = imgWidth * scale;
            let newHeight = imgHeight * scale;

            // ✅ Limit max width to 60% of viewport width
            const maxWidth = canvasWidth * 0.65;
            if (newWidth > maxWidth) {
                scale = maxWidth / imgWidth;
                newWidth = imgWidth * scale;
                newHeight = imgHeight * scale;
            }

            const x = (canvasWidth - newWidth) / 2; // center
            const y = canvasHeight - newHeight - 70;     // bottom

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.drawImage(img, x, y, newWidth, newHeight);
        };





        gsap.to(frame, {
            index: frameCount - 1,
            snap: "index",
            ease: "none",
            scrollTrigger: {
                trigger: ".video-sequence",
                start: startValue,
                end: endValue,
                scrub: true,
                pin: true,
            },
            onUpdate: render,
        });

        // initial draw
        render();
    }, [loaded]);

    return (
        <>
            <section id="hero" className="noisy">
                <h1 className="title">MOJITO</h1>

                <img
                    src="/images/hero-left-leaf.png"
                    alt="left-leaf"
                    className="left-leaf"
                />
                <img
                    src="/images/hero-right-leaf.png"
                    alt="right-leaf"
                    className="right-leaf"
                />

                <div className="body">
                    <div className="content">
                        <div className="space-y-5 hidden md:block">
                            <p>Cool. Crisp. Classic.</p>
                            <p className="subtitle">
                                Sip the Spirit <br /> of Summer
                            </p>
                        </div>

                        <div className="view-cocktails">
                            <p className="subtitle">
                                Every cocktail on our menu is a blend of premium ingredients,
                                creative flair, and timeless recipes — designed to delight your
                                senses.
                            </p>
                            <a href="#cocktails">View cocktails</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* 🎥 Canvas replacing <video> */}
            <div className="video-sequence absolute inset-0 w-screen h-screen">
                <canvas ref={canvasRef} className="w-full h-full"></canvas>
            </div>

        </>
    );
};

export default Hero;
